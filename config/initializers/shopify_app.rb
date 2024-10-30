ShopifyApp.configure do |config|
  config.application_name = "My Shopify App"
  config.old_secret = ""
  config.scope = "read_products,write_products,read_orders,write_orders,read_customers,write_customers,read_content,write_content,read_product_listings,read_inventory,write_inventory,read_locations,read_script_tags,write_script_tags,read_fulfillments,write_fulfillments,read_shipping,write_shipping,read_checkouts,write_checkouts,read_discounts,write_discounts" 
  # Consult this page for more scope options:
  # https://help.shopify.com/en/api/getting-started/authentication/oauth/scopes
  
  config.embedded_app = true
  # config.new_embedded_auth_strategy = true
  # unstable_newEmbeddedAuthStrategy

  config.after_authenticate_job = false
  config.api_version = "2024-10"
  config.shop_session_repository = 'Shop'
  config.log_level = :info
  config.reauth_on_access_scope_changes = true
  config.webhooks = [
    { topic: "app/uninstalled", address: "webhooks/app_uninstalled"},
    { topic: "customers/data_request", address: "webhooks/customers_data_request" },
    { topic: "customers/redact", address: "webhooks/customers_redact"},
    { topic: "shop/redact", address: "webhooks/shop_redact"}
  ]
  # SHOPIFY_API_KEY=a26a987fcf7ad902a06f04f2264fd613
  # SHOPIFY_API_SECRET=5356127fc0cf8ce7fcd75e9caa4b7298
  config.api_key = 'e95b175ee0b3d62d59134332bf13d273'
  config.secret = 'dd18fa7ced71f4920a9b448cd1fb9d52'

  # You may want to charge merchants for using your app. Setting the billing configuration will cause the Authenticated
  # controller concern to check that the session is for a merchant that has an active one-time payment or subscription.
  # If no payment is found, it starts off the process and sends the merchant to a confirmation URL so that they can
  # approve the purchase.
  #
  # Learn more about billing in our documentation: https://shopify.dev/apps/billing
  # config.billing = ShopifyApp::BillingConfiguration.new(
  #   charge_name: "My app billing charge",
  #   amount: 5,
  #   interval: ShopifyApp::BillingConfiguration::INTERVAL_EVERY_30_DAYS,
  #   currency_code: "USD", # Only supports USD for now
  #   trial_days: 0,
  #   test: !ENV['SHOPIFY_TEST_CHARGES'].nil? ? ["true", "1"].include?(ENV['SHOPIFY_TEST_CHARGES']) : !Rails.env.production?
  # )

  if defined? Rails::Server
    raise('Missing SHOPIFY_API_KEY. See https://github.com/Shopify/shopify_app#requirements') unless config.api_key
    raise('Missing SHOPIFY_API_SECRET. See https://github.com/Shopify/shopify_app#requirements') unless config.secret
  end
end

Rails.application.config.after_initialize do
  if ShopifyApp.configuration.api_key.present? && ShopifyApp.configuration.secret.present?
    ShopifyAPI::Context.setup(
      api_key: ShopifyApp.configuration.api_key,
      api_secret_key: ShopifyApp.configuration.secret,
      api_version: ShopifyApp.configuration.api_version,
      host: ENV['HOST'],
      scope: ShopifyApp.configuration.scope,
      is_private: !ENV.fetch('SHOPIFY_APP_PRIVATE_SHOP', '').empty?,
      is_embedded: ShopifyApp.configuration.embedded_app,
      log_level: :info,
      logger: Rails.logger,
      private_shop: ENV.fetch('SHOPIFY_APP_PRIVATE_SHOP', nil),
      user_agent_prefix: "ShopifyApp/#{ShopifyApp::VERSION}"
    )

    ShopifyApp::WebhooksManager.add_registrations
  end
end
# require "will_paginate/array"
# ShopifyApp.configure do |config|
#   config.application_name = "My Shopify App"
#   # config.api_key = "a8ebd4e9da314ee5173d326a179c3522"
#   # config.secret = "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"
#   # config.api_key = "58c63e1aa11ae8480094f045c027ba67"
#   # config.secret = "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"
  
#   config.old_secret = ""
#   config.scope = "read_products,write_products,read_orders,write_orders,read_customers,write_customers,read_content,write_content,read_product_listings,read_inventory,write_inventory,read_locations,read_script_tags,write_script_tags,read_fulfillments,write_fulfillments,read_shipping,write_shipping,read_checkouts,write_checkouts,read_discounts,write_discounts" 
#   # Consult this page for more scope options:
#   # https://help.shopify.com/en/api/getting-started/authentication/oauth/scopes
#   config.embedded_app = true
#   config.after_authenticate_job = false
#   config.api_version = "2020-07"
#   config.shop_session_repository = "Shop"
#   config.disable_webpacker = true
#   config.api_key = 'a26a987fcf7ad902a06f04f2264fd613'
#   config.secret = '5356127fc0cf8ce7fcd75e9caa4b7298'

#   config.webhooks = [
#     { topic: "orders/paid", address: "https://midwayteamstore.com/webhooks/orders_paid", format: "json" },
#   # { topic: "orders/paid", address: "https://xs-midway.herokuapp.com/webhooks/orders_paid", format: "json" },
#   # {topic: 'carts/update', address: 'https://example.com/webhooks/carts_update', format: 'json'},
#   ]
# end

# ShopifyApp::Utils.fetch_known_api_versions                        # Uncomment to fetch known api versions from shopify servers on boot
# ShopifyAPI::ApiVersion.version_lookup_mode = :raise_on_unknown    # Uncomment to raise an error if attempting to use an api version that was not previously known


