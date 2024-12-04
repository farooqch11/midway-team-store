class FetchProductVariantJob < ApplicationJob
    retry_on ShopifyAPI::Errors::HttpResponseError, wait: 5.seconds, attempts: 3
    
    queue_as :default
  
    def perform(*args)
      fetch_variant()
    
    #  add_metafield()
     
    end
    def add_metafield
        shop = Shop.last
  
        if shop.nil?
          Rails.logger.error("No shop found to execute FetchProductVariantJob")
          return
        end
    
        shop.with_shopify_session do
          session = ShopifyAPI::Auth::Session.new(
              shop: shop.shopify_domain,
              access_token: shop.shopify_token
            )
      
          client = ShopifyAPI::Clients::Graphql::Admin.new(session: session)
          
        end
    end
    def fetch_variant
        shop = Shop.last
  
        if shop.nil?
          Rails.logger.error("No shop found to execute FetchProductVariantJob")
          return
        end
    
        shop.with_shopify_session do
          session = ShopifyAPI::Auth::Session.new(
              shop: shop.shopify_domain,
              access_token: shop.shopify_token
            )
      
          client = ShopifyAPI::Clients::Graphql::Admin.new(session: session)
          query = <<~QUERY
                  query {
                      productVariant(id: "gid://shopify/ProductVariant/49904338534681") {
                     edges {
                        node {
                            metafields(first: 10) {
                            edges {
                                node {
                                namespace
                                key
                                value
                                }
                            }
                            }
                        }
                        }
                  }
                  }
                  QUERY
  
    
          begin
            response = client.query(query: query)
            if response.code == 200
              product = response.body.dig("data", "productVariant")
              puts product
              if product.present?
                Rails.logger.info("Fetched product: #{product}")
              else
                Rails.logger.warn("No products found in the response")
              end
            else
              Rails.logger.error("GraphQL query failed: #{response.body}")
            end
          rescue ShopifyAPI::Errors::HttpResponseError => e
            Rails.logger.error("Shopify API error: #{e.message}")
            raise
          rescue => e
            Rails.logger.error("Unexpected error: #{e.message}")
            raise
          end
        end
    end
  end
  