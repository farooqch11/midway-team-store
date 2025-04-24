class ProductsFetchJob
  def perform(*args)
    shopify_service = ShopifySessionService.new
    graphql_client = shopify_service.graphql_client

    products = fetch_all_products(graphql_client)

    total_products = 0
    total_saved = 0

    products.each do |product_node|
      total_products += 1
      puts "#{total_products} : #{product_node['title']}"

      product_id = product_node['id'].split("/").last
      local_product = Product.find_or_initialize_by(product_id: product_id)

      if local_product.new_record?
        total_saved += 1
        save_product(local_product, product_node)
        new_product = Product.find_by(product_id: product_id)
        save_product_attribs(product_node, new_product.id)
        save_product_variants(local_product, product_node)
        assign_default_color_if_needed(local_product, product_node)
        tag_custom_team_store(local_product, product_node['tags'].join(", ").downcase)
        puts "#{total_saved} : Saved in database"
      else
        puts "Already in database"
      end
    end

    puts "Total Products in team store: #{total_products}"
    puts "Total Saved in team store: #{total_saved}"
  end

  private

  def fetch_all_products(client)
    products = []
    has_next_page = true
    cursor = nil

    while has_next_page
      query = <<~GRAPHQL
        {
          products(first: 50#{cursor ? ", after: \"#{cursor}\"" : ""}) {
            pageInfo {
              hasNextPage
              endCursor
            }
            edges {
              node {
                id
                title
                handle
                vendor
                productType
                tags
                status
                bodyHtml
                images(first: 10) {
                  edges {
                    node {
                      id
                      src
                    }
                  }
                }
                variants(first: 50) {
                  edges {
                    node {
                      id
                      title
                      price
                      sku
                      availableForSale
                      inventoryQuantity
                      image {
                        id
                      }
                      selectedOptions {
                        name
                        value
                      }
                      inventoryItem {
                        id
                        inventoryLevels(first: 1) {
                          edges {
                            node {
                              location {
                                id
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
                options {
                  name
                }
              }
            }
          }
        }
      GRAPHQL

      response = client.query(query: query)
      data = response.body['data']['products']
      products += data['edges'].map { |edge| edge['node'] }

      has_next_page = data['pageInfo']['hasNextPage']
      cursor = data['pageInfo']['endCursor']
    end

    products
  end

  def save_product(local_product, shopify_product)
    image_src = shopify_product['images']['edges'].first&.dig('node', 'src')

    local_product.assign_attributes(
      title: shopify_product['title'],
      handle: shopify_product['handle'],
      price: shopify_product['variants']['edges'].first['node']['price'].to_f * 100,
      tags: shopify_product['tags'].join(', '),
      description: shopify_product['bodyHtml'],
      published: false,
      vendor: shopify_product['vendor'],
      image_url: image_src
    )
    local_product.save
  end

  def save_product_attribs(shopify_product, product_id)
    color_index = find_color_option_index(shopify_product)
    shopify_product['variants']['edges'].each do |edge|
      variant = edge['node']
      attrib = Attrib.find_or_initialize_by(variant_id: variant['id'].split("/").last)
      next unless attrib.new_record?

      color = variant['selectedOptions'].find { |opt| opt['name'].downcase == 'color' }&.dig('value')
      image_id = variant['image']&.dig('id')
      variant_image = shopify_product['images']['edges'].find { |img| img['node']['id'] == image_id }&.dig('node', 'src')

      attrib.assign_attributes(
        title: variant['title'],
        handle: variant['title'].parameterize(separator: '_'),
        color: color.to_s.parameterize(separator: '_'),
        variant_id: variant['id'].split("/").last,
        image_url: variant_image,
        attrib_type: 'variant',
        product_id: product_id
      )
      attrib.save
    end
  end

  def save_product_variants(p, product)
    color_index = find_color_option_index(product)
    p.color_images.destroy_all

    product['variants']['edges'].each do |edge|
      variant = edge['node']
      color = variant['selectedOptions'].find { |opt| opt['name'].downcase == 'color' }&.dig('value')
      color_image = save_color_image(p, color, variant, product)
      save_color_variant(p, color) if color_image
    end
  end

  def find_color_option_index(product)
    product['options'].index { |opt| %w[color colour].include?(opt['name'].downcase) }&.+1
  end

  def save_color_image(p, color, variant, product)
    return unless color && variant['image']

    variant_image = product['images']['edges'].find { |img| img['node']['id'] == variant['image']['id'] }&.dig('node', 'src')
    color_image = p.color_images.find_or_initialize_by(color: color)
    color_image.update(url: variant_image)
    color_image
  end

  def save_color_variant(p, color)
    color_record = Color.find_or_create_by(title: color) { |c| c.code = "#000000" }
    attrib = Attrib.find_by_title("Color")
    ProductAttrib.create(product: p, color: color_record, attrib: attrib) if attrib
  end

  def assign_default_color_if_needed(p, product)
    default_color = Color.find_or_create_by(title: "Default") { |c| c.code = "#fff" }
    if product['images']['edges'].any? && p.color_images.none?
      ColorImage.create(product: p, color: default_color, url: product['images']['edges'].first['node']['src'])
    end
  end

  def tag_custom_team_store(p, tagsdown)
    p.update(custom_product: true) if tagsdown.include?("custom team store")
  end
end
