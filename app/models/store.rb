class Store < ApplicationRecord
  # has_and_belongs_to_many :products
  belongs_to :team_admin
  has_many :shopify_products
  has_many :orders
  has_many :products, :through => :shopify_products
  has_many :logos
  has_secure_token :admin_token
  has_many :payouts
  has_many :logo_requests

  def has_product_with_shopify_id(id)
    found = false
    self.shopify_products.each do |s|
      if s.shopify_id.to_i == id.to_i
        found = true
        break
      end
    end
    return found
  end

  def add_product(p, color_id)
    # if !self.shopify_products.find_by_product_id(p.id)
    s = ShopifyProduct.new
    s.store = self
    s.product_id = p.id
    if s.product.color_images.size > 0
      s.set_selected_color s.product.color_images.find_by_id color_id
    end

    price_to_be = p.price
    if self.fundraising != nil and self.fundraising != 0
      price_to_be = p.price.to_f * self.fundraising.to_f
      price_to_be = price_to_be / 100.0

      price_to_be = price_to_be + p.price.to_f
    end

    s.price = price_to_be
    s.shopify_id = p.product_id
    s.handle = p.handle
    s.save
    # else
    #   s = self.shopify_products.find_by_product_id(p.id)
    #   s.set_selected_color s.product.color_images.find_by_id color_id
    #   s.save
    # end
  end

  def remove_product(p)
    # self.products.delete(p.product.id)
    p.delete
  end

  def get_funds_raised
    funds = 0.0

    self.orders.each do |order|
      funds += order.fundraised
    end
    return funds
  end

  def is_published?
    return true if self.collection != nil
    return false
  end

  def set_main_logo(logo_id)
    self.logos.each do |logo|
      if logo.id.to_i == logo_id.to_i
        logo.main = true
      else
        logo.main = false
      end
      logo.save
    end
  end
  def set_main_banner(logo_id)
    self.logos.each do |logo|
      if logo.id.to_i == logo_id.to_i
        logo.banner = true
      else
        logo.banner = false
      end
      logo.save
    end
  end

  def get_main_logo
    found = main_logo

    if !found
      return get_first_logo
    else
      return get_logo_uri(found)
    end
  end

  def get_main_banner
    found = main_banner
    if found
      return get_logo_uri(found)
    end

  end

  def main_logo
    found = false
    self.logos.each do |logo|
      if logo.main
        found = logo
      end
    end
    return found
  end

  def main_banner
    found = false
    self.logos.each do |logo|
      if logo.banner
        found = logo
      end
    end
    return found
  end

  def get_first_logo
    uri = ""
    if self.logos.size > 0
      l = self.logos.first
      uri = get_logo_uri(l)
    end
    return uri
  end
  
  def get_logo_uri(l)
    return l.logo_file.url if l&.logo_file&.attached?
  end
  
end
