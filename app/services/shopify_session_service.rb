class ShopifySessionService
  def initialize
    access_token = ENV["SHOPIFY_ACCESS_TOKEN"]
    session = ShopifyAPI::Auth::Session.new(
      shop: "#{ENV["SHOP_NAME"]}.myshopify.com",
      access_token: access_token
    )

    @session = session
  end

  def graphql_client
    @graphql_client = ShopifyAPI::Clients::Graphql::Admin.new(session: @session, api_version: ENV["API_VERSION"])
  end

  def rest_client
    @rest_client = ShopifyAPI::Clients::Rest::Admin.new(session: @session)
  end
end
