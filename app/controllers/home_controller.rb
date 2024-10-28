# frozen_string_literal: true

class HomeController < AuthenticatedController
  def index
    # @products = ShopifyAPI::Product.find(:all, params: { limit: 10 })
    @products = ShopifyAPI::Product.all(limit: 10)
    @webhooks = ShopifyAPI::Webhook.all

    # @webhooks = ShopifyAPI::Webhook.find(:all)
  end
end
