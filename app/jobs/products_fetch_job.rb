class ProductsFetchJob < ApplicationJob
  queue_as :default

  def perform(*args)
    s = Shop.first

    s.with_shopify_session do
      custom_product_vendor = "xs_custom"
      @pros = []
      s_products = ShopifyAPI::Product.find(:all, params: { limit: 50 })

      @pros = @pros + s_products
      sleep(1)
      i = 0

      while s_products.next_page?
        s_products = s_products.fetch_next_page
        # puts s_products.inspect
        @pros = @pros + s_products
        sleep(0.6)
        puts "Request done"
      end

      t_products = 0
      t_saved = 0
      puts "products fetched : #{@pros.size}"
      @pros.each do |product|
        tagsdown = product.tags.downcase
        next if product.product_type == "[xs]"
        next if !tagsdown.include? "team store" and !tagsdown.include? "custom team store"
        t_products += 1

        puts "#{t_products} : #{product.title}"

        p = Product.find_by_product_id product.id
        if !p
          t_saved += 1
          puts "#{t_saved} : Saving in database...."
          p = Product.new
          p.product_id = product.id
          p.title = product.title
          p.handle = product.handle
          p.price = product.variants.first.price.to_f * 100
          p.tags = product.tags
          p.description = product.body_html
          p.published = false
          p.vendor = product.vendor
          if product.images.size > 0
            p.image_url = product.images.first.src
            p.save
          end

          p.price = product.variants.first.price.to_f * 100
          p.save
          puts product.variants.first.price
          colorIndex = nil
          i = 1
          product.options.each do |option|
            o = option.name.downcase
            if o == "color" or o == "colour"
              colorIndex = i
              break
            end
            i = i + 1
          end

          p.color_images.each do |c|
            c.delete
          end
          if colorIndex != nil
            product.variants.each do |variant|
              propname = "option#{colorIndex}"
              color = variant.send(propname)

              # saving the color
              c = Color.find_by_title color
              if !c
                c = Color.new
                c.title = color
                c.code = "#000000"
                c.save
              end
              attrib = Attrib.find_by_title "Color"
              if attrib
                pa = ProductAttrib.new
                pa.product = p
                pa.color = c
                pa.attrib = attrib
                pa.save
              end

              color_image = p.color_images.find_by_color color

              if !color_image
                if variant.image_id != nil
                  variantImage = ShopifyAPI::Image.find(variant.image_id, :params => { :product_id => p.product_id })
                  sleep 0.8
                  color_image = ColorImage.new
                  color_image.product = p
                  color_image.color = color
                  color_image.url = variantImage.src
                  color_image.save
                end
              end
            end
          else
            dc = Color.find_by_title "Default"
            if !dc
              dc = Color.new
              dc.title = "Default"
              dc.code = "#fff"
              dc.save
            end

            if product.images.size > 0
              color_image = ColorImage.new
              color_image.product = p
              color_image.color = dc
              color_image.url = product.images.first.src
              color_image.save
            end
          end
          if tagsdown.include? "custom team store"
            p.custom_product = true
            p.save
          end
        else
          puts "Already in database"
        end
      end

      puts "Total Products team store: #{t_products}"
      puts "Total Saved team store: #{t_saved}"
    end
  end
end
