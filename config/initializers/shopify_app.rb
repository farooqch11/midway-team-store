require "will_paginate/array"
ShopifyApp.configure do |config|
  config.application_name = "My Shopify App"
  # config.api_key = "a8ebd4e9da314ee5173d326a179c3522"
  # config.secret = "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"
  config.api_key = "58c63e1aa11ae8480094f045c027ba67"
  config.secret = "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"
  config.old_secret = ""
  config.scope = "read_products,write_products,read_orders,write_orders,read_customers,write_customers,read_content,write_content,read_product_listings,read_inventory,write_inventory,read_locations,read_script_tags,write_script_tags,read_fulfillments,write_fulfillments,read_shipping,write_shipping,read_checkouts,write_checkouts,read_discounts,write_discounts" # Consult this page for more scope options:
  # https://help.shopify.com/en/api/getting-started/authentication/oauth/scopes
  config.embedded_app = true
  config.after_authenticate_job = false
  config.api_version = "2020-07"
  config.shop_session_repository = "Shop"
  config.disable_webpacker = true
  config.webhooks = [
    { topic: "orders/paid", address: "https://midwayteamstore.com/webhooks/orders_paid", format: "json" },
  # { topic: "orders/paid", address: "https://xs-midway.herokuapp.com/webhooks/orders_paid", format: "json" },
  # {topic: 'carts/update', address: 'https://example.com/webhooks/carts_update', format: 'json'},
  ]
end

# ShopifyApp::Utils.fetch_known_api_versions                        # Uncomment to fetch known api versions from shopify servers on boot
# ShopifyAPI::ApiVersion.version_lookup_mode = :raise_on_unknown    # Uncomment to raise an error if attempting to use an api version that was not previously known
