class SyncvendorsjobJob < ApplicationJob
  queue_as :default

  def perform(*args)
    # Do something later
    s = Shop.last

    s.with_shopify_session do
      Product.all.each do |pr|
        # if pr.vendor != nil
        #   puts "Skipping #{pr.title}"
        #   sleep 0.3
        #   next
        # end
        sid = pr.product_id
        sleep 0.8
        begin
          sp = ShopifyAPI::Product.find(sid.to_i)
          puts "Syncing..#{sp.title}....."
          pr.vendor = sp.vendor
          pr.save
        rescue
          puts "Product not found in shopify "
          pr.delete
        end
      end
    end
  end
end
