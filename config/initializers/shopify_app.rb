ShopifyApp.configure do |config|
  config.application_name = "Midway Team"
  config.old_secret = ""
  config.scope = "read_products,write_products,read_orders,write_orders,read_customers,write_customers,read_content,write_content,read_product_listings,read_inventory,write_inventory,read_locations,read_script_tags,write_script_tags,read_fulfillments,write_fulfillments,read_shipping,write_shipping,read_checkouts,write_checkouts,read_discounts,write_discounts" 
  # Consult this page for more scope options:
  # https://help.shopify.com/en/api/getting-started/authentication/oauth/scopes
  
  config.embedded_app = false
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
  
  config.api_key = ENV.fetch('SHOPIFY_API_KEY')
  config.secret = ENV.fetch('SHOPIFY_API_SECRET')

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
      host: ENV.fetch('HOST'),
      scope: ShopifyApp.configuration.scope,
      is_private: false,
      is_embedded: false,
      log_level: :info,
      logger: Rails.logger,
      user_agent_prefix: "ShopifyApp/#{ShopifyApp::VERSION}"
    )
  
    ShopifyApp::WebhooksManager.add_registrations
  end
end
