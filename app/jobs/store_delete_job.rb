class StoreDeleteJob < ApplicationJob
  queue_as :default

  def perform(store)
    # Do something later
    s = Shop.first
    s.with_shopify_session do
      store.shopify_products.each do |sp|
        begin
          product = ShopifyAPI::Product.find(sp.shopify_id.to_i)
          if product
            product.destroy
          end
          sp.destroy
        rescue => e
          puts e.inspect
          sp.destroy
        end
      end
      begin
        coll = ShopifyAPI::CustomCollection.find(store.collection)
        if coll
          coll.destroy
        end
        store.destroy
      rescue => e
        puts e.inspect
        store.destroy
      end
    end
  end
end
