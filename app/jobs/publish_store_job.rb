class PublishStoreJob < ApplicationJob
  queue_as :default

  def perform(*args)
    puts "running job"
    puts args.inspect
    store = args.first

    s = Shop.first
    s.with_shopify_session do
      collection = ShopifyAPI::CustomCollection.find(store.collection)
      puts "Total Products: #{store.shopify_products.size}"
      counter = 1
      store.shopify_products.each do |sp|
        npr = nil
        pr = sp.product

        prfound = false
        begin
          npr = ShopifyAPI::Product.find(sp.shopify_id.to_i)
          prfound = true
          npr.destroy
          prfound = false
          npr = nil
        rescue
          prfound = false
        end
        next if pr == nil
        ximage = nil
        # next if sp.image_url == nil
        # next if sp.image_url.url == nil

        if sp.image_url == nil or sp.image_url.url == nil
          # puts "sp image is nil-- using product image"
          ximage = pr.image_url
        else
          # puts "sp image is there, using it. ...... "
          ximage = sp.image_url.url
        end
        product = ShopifyAPI::Product.find(pr.product_id.to_i)

        if sp.shopify_id == nil or !prfound or npr == nil
          next if product == nil
          npr = ShopifyAPI::Product.new
          npr.published_scope = "web"
          npr.title = product.title
          npr.body_html = product.body_html
          npr.vendor = product.vendor
          npr.product_type = "[xs]"
          npr.options = []
          npr.variants = []

          color_index = nil
          i = 1
          product.options.each do |o|
            n = o.name.downcase
            if n != "color" and n != "colour"
              npr.options << {
                name: o.name,
              }
            else
              color_index = i
            end
            i = i + 1
          end
          puts "***making variants"
          puts npr.options.inspect
          c = sp.get_selected_color
          product.variants.each do |v|
            colorprop = "option#{color_index}"
            vobj = { :price => v.price, :weight => v.weight, :weight_unit => v.weight_unit }
            puts "Color: #{c.color.inspect} - color index: #{color_index}"
            if c.color != "Default" and color_index != nil
              puts "get color: #{v.send(colorprop)}"
              if v.send(colorprop) == c.color
                # puts "a varianat"
                oi = 1
                for i in 1..3
                  if i != color_index.to_i
                    oval = v.send("option#{i}")
                    if oval != nil
                      vobj["option#{oi}"] = oval
                      oi = oi + 1
                    end
                  end
                end
                puts vobj.inspect
                npr.variants << vobj
              end
            else
              vobj = {
                option1: v.option1,
                option2: v.option2,
                option3: v.option3,
                title: v.title,
                price: sp.price / 100.0,
                :weight => v.weight,
                :weight_unit => v.weight_unit,
              }
              npr.variants << vobj
            end
          end
          puts npr.variants.inspect

          if npr.save
            sp.shopify_id = npr.id
            sp.handle = npr.handle
            sp.save
          end
          # puts npr.errors.inspect
        end
        # puts "NPR"
        # puts npr.inspect
        npr.tags = "Team Store"
        if sp.essential
          npr.tags = npr.tags + ",essential"
        end
        npr.product_type = "[xs]"
        collection.add_product npr
        variant_ids = []
        npr.variants.each do |v|
          variant_ids << v.id.to_i
          v.attributes.delete(:inventory_quantity)
          v.attributes.delete(:old_inventory_quantity)
          v.price = sp.price / 100.0
          v.save
          # puts v.errors.messages.inspect
        end

        npr.images.each do |image|
          im = ShopifyAPI::Image.find(image.id, :params => { :product_id => npr.id })
          im.destroy
        end

        puts "processing: #{counter} product: #{npr.title}"
        npr.save
        sp.handle = npr.handle
        sp.save
        sleep(0.8)
        image = ShopifyAPI::Image.new
        if ximage != nil
          file_c = open(ximage) { |f| f.read }
          image.attachment = Base64.strict_encode64 file_c
          image.filename = "#{sp.get_selected_color.color.parameterize}.png"
          image.variant_ids = variant_ids
          image.prefix_options[:product_id] = npr.id
          image.position = 1
          image.save
        end
        # puts image.errors.inspect

        puts "processed: #{counter} product: #{npr.title}"
        counter += 1
      end

      store.processing = false
      store.save
    end
  end
end
