class OrdersPaidJob < ActiveJob::Base
  def perform(shop_domain:, webhook:)
    shop = Shop.find_by(shopify_domain: shop_domain)

    if shop.nil?
      logger.error("#{self.class} failed: cannot find shop with domain '#{shop_domain}'")
      return
    end

    shop.with_shopify_session do
      # bugsnag
      # puts webhook.inspect
      require 'pp'
      require 'json'
      # pp webhook

      order_title = webhook["name"]
      order_id = webhook["id"]

      if !Order.find_by_shopify_id order_id
        xs_items = []

        webhook["line_items"].each do |line_item|
          pp line_item
          is_xs_stock = false
          if line_item.include? "properties"
            line_item["properties"].each do |prop|
              if prop["name"] == "_xs_data"
                xs_data = JSON.parse prop["value"]
                xs_items << {
                  data: xs_data,
                  line_item: line_item
                }
                is_xs_stock = true
              end
            end
          end
        end

        pp xs_items
        xs_items.each do |xs_item|
          line_item = xs_item[:line_item]
          store = nil
          begin 
            store = Store.find(xs_item[:data]["store_id"])
          rescue 
          end
          if store 
            order = store.orders.find_by_shopify_id order_id
            
            if !order
              order = Order.new
              order.store = store
              order.team_admin = store.team_admin
              order.title = order_title
              order.price = 0.0
              order.shopify_id = order_id
              order.save
            end

            order_item = order.order_items.find_by_shopify_id line_item["id"]
            if !order_item
              order_item = OrderItem.new
              item_price = line_item["price"].to_f * 100
              order_item.order = order
              order_item.title = line_item["title"]
              order_item.shopify_id = line_item["id"]
              order_item.price = item_price
              order_item.quantity = line_item["quantity"]

              shopify_product = ShopifyProduct.find_by_shopify_id line_item["product_id"]
              
              profit = nil
              if shopify_product
                if shopify_product.store
                    if store.fundraising != nil and store.fundraising > 0
                      profit = (item_price / 100.0) * store.fundraising.to_f
                    else
                      profit = 0.0
                    end
                end
              end

              if profit != nil
                order_item.fundraised = profit 
              else
                order_item.fundraised = 0.0
              end

              order_item.save
              order
            end


            order_total_price = 0.0
            order_total_fundraised = 0.0
            order.order_items.each do |oitem|
              order_total_price += oitem.price
              order_total_fundraised += oitem.fundraised
            end
            order.price = order_total_price 
            order.fundraised = order_total_fundraised 
            order.save
          end
        end
      end
    end
  end
end
