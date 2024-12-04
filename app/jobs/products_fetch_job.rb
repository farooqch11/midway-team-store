class ProductsFetchJob < ApplicationJob
  retry_on ShopifyAPI::Errors::HttpResponseError, wait: 5.seconds, attempts: 3

  queue_as :default

  def perform(*args)
    shop = Shop.last

    shop.with_shopify_session do
      products = fetch_all_products
      puts "Products fetched: #{products.size}"

      total_products = 0
      total_saved = 0

      products.each do |shopify_product|
        # CHECK WITH CLIENT IF NEED TO CHECK
        # if eligible_for_team_store?(product)
          total_products += 1
          puts "#{total_products} : #{shopify_product.title}"

          local_product = Product.find_or_initialize_by(product_id: shopify_product.id)
          if local_product.new_record?
            total_saved += 1
            save_product(local_product, shopify_product)
            # new_product = Product.find_by(product_id: shopify_product.id)
            # save_product_attribs(shopify_product, new_product.id)
            
            save_product_variants(local_product, shopify_product)
            assign_default_color_if_needed(local_product, shopify_product)
            tag_custom_team_store(local_product, shopify_product.tags.downcase)
            puts "#{total_saved} : Saved in database"
          else
            puts "Already in database"
          end
        # end
      end

      puts "Total Products in team store: #{total_products}"
      puts "Total Saved in team store: #{total_saved}"
    end
  end

  private

  # Fetch all products with pagination
  def fetch_all_products
    products = []
    
    clientProducts = ShopifyAPI::Product.all(limit: 4)
    # loop do
      for product in clientProducts do
        products << product
      end
    #   break unless ShopifyAPI::Product.next_page?
    #   clientProducts = ShopifyAPI::Product.all(limit: 100, page_info: ShopifyAPI::Product.next_page_info)
    #   sleep(0.6)
    #   puts "Fetching next page of products..."
    # end
    products
  end

  # Check if a product is eligible for team store
  def eligible_for_team_store?(product)
    tagsdown = product.tags.downcase
    product.product_type != "[xs]" && (tagsdown.include?("team store") || tagsdown.include?("custom team store"))
  end

  # Save product information
  # GOOD TO GO
  def save_product(local_product, shopify_product)
    local_product.assign_attributes(
      title: shopify_product.title,
      handle: shopify_product.handle,
      price: shopify_product.variants.first.price.to_f * 100,
      tags: shopify_product.tags,
      description: shopify_product.body_html,
      published: false,
      vendor: shopify_product.vendor,
      image_url: shopify_product.images.first&.src
    )
    local_product.save
  end

  def save_product_attribs(shopify_product, product_id)
    color_index = find_color_option_index(shopify_product)
    # p.color_images.destroy_all

    shopify_product.variants.each do |variant|
      local_attrib = Attrib.find_or_initialize_by(variant_id: variant.id)
      if local_attrib.new_record?
        color = color_index ? variant.public_send("option#{color_index}") : nil
        puts color

        if color && variant.image_id
          variant_image = shopify_product.images.select { |image| image.id == variant.image_id }&.first.src
        end
        puts variant_image

        local_attrib.assign_attributes(
          title: variant.title,
          handle: variant.title.parameterize(separator: "_"),
          color: color.parameterize(separator: "_"),
          variant_id: variant.id,
          image_url: variant_image,
          attrib_type: "variant",
          product_id: product_id
        )
        local_attrib.save
      end
    end
  end

  # Save product variants and color options
  def save_product_variants(p, product)
    color_index = find_color_option_index(product)
    p.color_images.destroy_all

    product.variants.each do |variant|
      color = color_index ? variant.public_send("option#{color_index}") : nil
      color_image = save_color_image(p, color, variant, product)
      save_color_variant(p, color) if color_image
    end
  end

  # Find the index of color options
  def find_color_option_index(product)
    product.options.index { |option| %w[color colour].include?(option['name'].downcase) }&.+1
  end

  # Save color image if it doesn't exist
  def save_color_image(p, color, variant, product)
    if color && variant.image_id
      variant_image = product.images.select { |image| image.id == variant.image_id }&.first.src
      # variant_image = ShopifyAPI::Image.find(id: variant.image_id, product_id: p.product_id)
      # sleep(0.8)

      color_image = p.color_images.find_or_initialize_by(color: color)
      color_image.update(url: variant_image)
      color_image
    end
  end

  # Save color variant information
  def save_color_variant(p, color)
    color_record = Color.find_or_create_by(title: color) { |c| c.code = "#000000" }
    attrib = Attrib.find_by_title("Color")

    if attrib
      ProductAttrib.create(product: p, color: color_record, attrib: attrib)
    end
  end

  # Assign default color if no color options are available
  def assign_default_color_if_needed(p, product)
    default_color = Color.find_or_create_by(title: "Default") { |c| c.code = "#fff" }

    if product.images.any? && p.color_images.none?
      ColorImage.create(product: p, color: default_color, url: product.images.first.src)
    end
  end

  # Tag product as custom if relevant
  def tag_custom_team_store(p, tagsdown)
    if tagsdown.include?("custom team store")
      p.update(custom_product: true)
    end
  end
end

# ORIGINAL CODE
# class ProductsFetchJob < ApplicationJob
#   queue_as :default

#   def perform(*args)
#     s = Shop.first

#     s.with_shopify_session do
#       custom_product_vendor = "xs_custom"
#       @pros = []
#       s_products = ShopifyAPI::Product.find(:all, params: { limit: 50 })

#       @pros = @pros + s_products
#       sleep(1)
#       i = 0

#       while s_products.next_page?
#         s_products = s_products.fetch_next_page
#         # puts s_products.inspect
#         @pros = @pros + s_products
#         sleep(0.6)
#         puts "Request done"
#       end

#       t_products = 0
#       t_saved = 0
#       puts "products fetched : #{@pros.size}"
#       @pros.each do |product|
#         tagsdown = product.tags.downcase
#         next if product.product_type == "[xs]"
#         next if !tagsdown.include? "team store" and !tagsdown.include? "custom team store"
#         t_products += 1

#         puts "#{t_products} : #{product.title}"

#         p = Product.find_by_product_id product.id
#         if !p
#           t_saved += 1
#           puts "#{t_saved} : Saving in database...."
#           p = Product.new
#           p.product_id = product.id
#           p.title = product.title
#           p.handle = product.handle
#           p.price = product.variants.first.price.to_f * 100
#           p.tags = product.tags
#           p.description = product.body_html
#           p.published = false
#           p.vendor = product.vendor
#           if product.images.size > 0
#             p.image_url = product.images.first.src
#             p.save
#           end

#           p.price = product.variants.first.price.to_f * 100
#           p.save
#           puts product.variants.first.price
#           colorIndex = nil
#           i = 1
#           product.options.each do |option|
#             o = option.name.downcase
#             if o == "color" or o == "colour"
#               colorIndex = i
#               break
#             end
#             i = i + 1
#           end

#           p.color_images.each do |c|
#             c.delete
#           end
#           if colorIndex != nil
#             product.variants.each do |variant|
#               propname = "option#{colorIndex}"
#               color = variant.send(propname)

#               # saving the color
#               c = Color.find_by_title color
#               if !c
#                 c = Color.new
#                 c.title = color
#                 c.code = "#000000"
#                 c.save
#               end
#               attrib = Attrib.find_by_title "Color"
#               if attrib
#                 pa = ProductAttrib.new
#                 pa.product = p
#                 pa.color = c
#                 pa.attrib = attrib
#                 pa.save
#               end

#               color_image = p.color_images.find_by_color color

#               if !color_image
#                 if variant.image_id != nil
#                   variantImage = ShopifyAPI::Image.find(variant.image_id, :params => { :product_id => p.product_id })
#                   sleep 0.8
#                   color_image = ColorImage.new
#                   color_image.product = p
#                   color_image.color = color
#                   color_image.url = variantImage.src
#                   color_image.save
#                 end
#               end
#             end
#           else
#             dc = Color.find_by_title "Default"
#             if !dc
#               dc = Color.new
#               dc.title = "Default"
#               dc.code = "#fff"
#               dc.save
#             end

#             if product.images.size > 0
#               color_image = ColorImage.new
#               color_image.product = p
#               color_image.color = dc
#               color_image.url = product.images.first.src
#               color_image.save
#             end
#           end
#           if tagsdown.include? "custom team store"
#             p.custom_product = true
#             p.save
#           end
#         else
#           puts "Already in database"
#         end
#       end

#       puts "Total Products team store: #{t_products}"
#       puts "Total Saved team store: #{t_saved}"
#     end
#   end
# end
