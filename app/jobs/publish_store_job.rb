class PublishStoreJob < ApplicationJob
  require 'open-uri'
 
  queue_as :default

  def perform(store)
    puts "Running job for store: #{store.id}"
    shop = Shop.last
    shop.with_shopify_session do

      # collection = find_collection(store.collection)
      collection = store.collection
      return unless collection
     
      process_products(store, collection)
    end
    mark_store_as_processed(store)
    puts "Job completed for store: #{store.id}"
  end

  private

  def initialize_shopify_session
    shop = Shop.last
    shop.with_shopify_session
  end

  def find_collection(collection_id)
    ShopifyAPI::CustomCollection.find(id: collection_id)
  rescue => e
    puts "Error finding collection: #{e.message}"
    nil
  end

  def process_products(store, collection)
    store.shopify_products.each_with_index do |local_shopify_product, index|
      local_product = local_shopify_product.product
      next unless local_product

      existing_shopify_product = find_existing_product(local_shopify_product.shopify_id)
      create_or_update_product(existing_shopify_product, local_product, collection)
      puts "Processed product #{index + 1}: #{existing_shopify_product&.title} #{local_product.title}"
      sleep(0.8) # to handle rate limits
    end
  end

  def find_existing_product(shopify_id)
    ShopifyAPI::Product.find(id: shopify_id.to_i)
  rescue
    nil
  end

  def find_shopify_product(product_id)
    ShopifyAPI::Product.find(id: product_id.to_i)
  rescue
    nil
  end

  def create_or_update_product(existing_shopify_product, local_product, collection)
    if existing_shopify_product == nil 
      shopify_product = find_shopify_product(local_product.product_id)
    else   
      shopify_product = existing_shopify_product
    end
    new_shopify_product = initialize_product(local_product, shopify_product)
    add_variants_to_product(new_shopify_product, local_product, shopify_product)

    if new_shopify_product.save!
        puts "New Shopify Product ID: #{new_shopify_product}"
        local_shopify_product = local_product.shopify_products.first
        add_product_image(local_shopify_product, new_shopify_product)
        update_shopify_product(local_shopify_product, new_shopify_product)
        update_collection(collection, new_shopify_product)
        # collection.add_product(new_shopify_product)
     else
       puts "Failed to save product: #{new_product.errors.full_messages.join(', ')}"
     end
  end

  def initialize_product(local_product, shopify_product)
    
    product_properties = {
      title: local_product.title,
      body_html: local_product.description,
      vendor: local_product.vendor,
      published_scope: "web",
      product_type: "[xs]",
      options: build_options(shopify_product),
      variants: []
    }
    ShopifyAPI::Product.new(from_hash: product_properties)
  end

  def build_options(shopify_product)
    options = []
    shopify_product.options.each_with_index do |option, index|
      options << { name: option['name'] } unless %w[color colour].include?(option['name'].downcase)
    end
    options
  end

  def add_variants_to_product(new_shopify_product, local_product, shopify_product)
    color_index = detect_color_index(shopify_product)
    selected_color = local_product.shopify_products.first.get_selected_color.color
    shopify_product.variants.each do |variant|
      variant_obj = build_variant(variant, local_product, color_index, selected_color)
      new_shopify_product.variants << variant_obj if variant_obj
    end
  end

  def build_variant(variant, local_product, color_index, selected_color)
    if color_index && selected_color != "Default" && variant.send("option#{color_index}") != selected_color
      return nil
    end

    {
      price: local_product.shopify_products.first.price / 100.0,
      weight: variant.weight,
      weight_unit: variant.weight_unit,
      option1: variant.option1,
      option2: variant.option2,
      option3: variant.option3,
      title: variant.title
    }
  end

  def detect_color_index(shopify_product)
    shopify_product.options.each_with_index do |option, index|
      return index + 1 if %w[color colour].include?(option['name'].downcase)
    end
    nil
  end

  def add_product_image(local_shopify_product, new_shopify_product)
    image_url = local_shopify_product.image_url&.url || new_product.image_url
    return unless image_url

    # image_data = open(image_url) { |f| f.read }
    image_data = URI.open(image_url) { |f| f.read }

    encoded_image = Base64.strict_encode64(image_data)

    product_image = ShopifyAPI::Image.new
    product_image.attachment =  encoded_image
    product_image.filename =  "#{local_shopify_product.get_selected_color.color.parameterize}.png"
    product_image.product_id = new_shopify_product.id
    product_image.save!
  end

  def update_shopify_product(local_shopify_product, new_product)
    local_shopify_product.update(shopify_id: new_product.id, handle: new_product.handle)
  end

  def update_collection(collection_id, new_shopify_product)
    custom_collection = ShopifyAPI::CustomCollection.new
    custom_collection.id = collection_id.to_i
    custom_collection.collects = [
      {
        "product_id" => new_shopify_product.id
      }
    ]
    custom_collection.save!

  end

  def mark_store_as_processed(store)
    store.update(processing: false)
  end
end

# class PublishStoreJob < ApplicationJob
#   queue_as :default

#   def perform(store)
#     puts "running job"
#     puts store.inspect
#     # store = args.first

#     s = Shop.first
#     s.with_shopify_session do
#       collection = ShopifyAPI::CustomCollection.find(store.collection)
#       puts "Total Products: #{store.shopify_products.size}"
#       counter = 1
#       store.shopify_products.each do |sp|
#         npr = nil
#         pr = sp.product

#         prfound = false
#         begin
#           npr = ShopifyAPI::Product.find(sp.shopify_id.to_i)
#           prfound = true
#           npr.destroy
#           prfound = false
#           npr = nil
#         rescue
#           prfound = false
#         end
#         next if pr == nil
#         ximage = nil
#         # next if sp.image_url == nil
#         # next if sp.image_url.url == nil

#         if sp.image_url == nil or sp.image_url.url == nil
#           # puts "sp image is nil-- using product image"
#           ximage = pr.image_url
#         else
#           # puts "sp image is there, using it. ...... "
#           ximage = sp.image_url.url
#         end
#         product = ShopifyAPI::Product.find(pr.product_id.to_i)

#         if sp.shopify_id == nil or !prfound or npr == nil
#           next if product == nil
#           npr = ShopifyAPI::Product.new
#           npr.published_scope = "web"
#           npr.title = product.title
#           npr.body_html = product.body_html
#           npr.vendor = product.vendor
#           npr.product_type = "[xs]"
#           npr.options = []
#           npr.variants = []

#           color_index = nil
#           i = 1
#           product.options.each do |o|
#             n = o.name.downcase
#             if n != "color" and n != "colour"
#               npr.options << {
#                 name: o.name,
#               }
#             else
#               color_index = i
#             end
#             i = i + 1
#           end
#           puts "***making variants"
#           puts npr.options.inspect
#           c = sp.get_selected_color
#           product.variants.each do |v|
#             colorprop = "option#{color_index}"
#             vobj = { :price => v.price, :weight => v.weight, :weight_unit => v.weight_unit }
#             puts "Color: #{c.color.inspect} - color index: #{color_index}"
#             if c.color != "Default" and color_index != nil
#               puts "get color: #{v.send(colorprop)}"
#               if v.send(colorprop) == c.color
#                 # puts "a varianat"
#                 oi = 1
#                 for i in 1..3
#                   if i != color_index.to_i
#                     oval = v.send("option#{i}")
#                     if oval != nil
#                       vobj["option#{oi}"] = oval
#                       oi = oi + 1
#                     end
#                   end
#                 end
#                 puts vobj.inspect
#                 npr.variants << vobj
#               end
#             else
#               vobj = {
#                 option1: v.option1,
#                 option2: v.option2,
#                 option3: v.option3,
#                 title: v.title,
#                 price: sp.price / 100.0,
#                 :weight => v.weight,
#                 :weight_unit => v.weight_unit,
#               }
#               npr.variants << vobj
#             end
#           end
#           puts npr.variants.inspect

#           if npr.save
#             sp.shopify_id = npr.id
#             sp.handle = npr.handle
#             sp.save
#           end
#           # puts npr.errors.inspect
#         end
#         # puts "NPR"
#         # puts npr.inspect
#         npr.tags = "Team Store"
#         if sp.essential
#           npr.tags = npr.tags + ",essential"
#         end
#         npr.product_type = "[xs]"
#         collection.add_product npr
#         variant_ids = []
#         npr.variants.each do |v|
#           variant_ids << v.id.to_i
#           v.attributes.delete(:inventory_quantity)
#           v.attributes.delete(:old_inventory_quantity)
#           v.price = sp.price / 100.0
#           v.save
#           # puts v.errors.messages.inspect
#         end

#         npr.images.each do |image|
#           im = ShopifyAPI::Image.find(image.id, :params => { :product_id => npr.id })
#           im.destroy
#         end

#         puts "processing: #{counter} product: #{npr.title}"
#         npr.save
#         sp.handle = npr.handle
#         sp.save
#         sleep(0.8)
#         image = ShopifyAPI::Image.new
#         if ximage != nil
#           file_c = open(ximage) { |f| f.read }
#           image.attachment = Base64.strict_encode64 file_c
#           image.filename = "#{sp.get_selected_color.color.parameterize}.png"
#           image.variant_ids = variant_ids
#           image.prefix_options[:product_id] = npr.id
#           image.position = 1
#           image.save
#         end
#         # puts image.errors.inspect

#         puts "processed: #{counter} product: #{npr.title}"
#         counter += 1
#       end

#       store.processing = false
#       store.save
#     end
#   end
# end
