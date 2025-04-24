class Product < ApplicationRecord
  has_and_belongs_to_many :categories
  # has_and_belongs_to_many :stores
  has_one :logo_param, :required => false

  has_many :shopify_products
  has_many :stores, :through => :shopify_products
  has_many :product_attribs
  has_many :attribs, dependent: :destroy
  has_many :variant_images

  has_many :color_images

  # scope :published , ~> { where(published: true)}

  scope :not_custom, -> { where(custom_product: false) }
  scope :custom, -> { where(custom_product: true) }
  scope :published, -> { where(published: true) }


  def self.get_all_vendors
    vendors = []
    Product.all.each do |product|
      if !vendors.include? product.vendor
        vendors << product.vendor
      end
    end
    return vendors
  end

  def add_attribute(attrib, value)
    found = false
    self.product_attribs.each do |a|
      if attrib.attrib_type == "text"
        if a.title == value
          found = true
          break
        end
      elsif attrib.attrib_type == "color"
        if a.color_id == value
          found = true
          break
        end
      end
    end

    if !found
      pa = ProductAttrib.new
      pa.product = self
      pa.attrib = attrib

      if attrib.attrib_type == "color"
        color = Color.find value
        pa.color = color
      else
        pa.title = value
      end
      pa.save
    end
  end

  def remove_attribute(attrib, value)
    self.product_attribs.each do |a|
      if a.attrib == attrib
        if attrib.attrib_type == "color"
          a.color_id == value
          a.delete
        else
          if a.title == value
            a.delete
          end
        end
      end
    end
  end

  def get_attributes_str(attrib)
    attrs = []
    self.product_attribs.each do |a|
      if a.attrib == attrib
        if attrib.attrib_type == "color"
          attrs << a.color_id
        else
          attrs << a.title
        end
      end
    end
    return attrs.join ","
  end

  def get_attributes(attrib)
    attribs = []
    self.product_attribs.reload.each do |a|
      attribs << a if a.attrib == attrib
    end
    return attribs
  end

  def publish
    self.published = true
    self.save
  end

  def unpublish
    self.published = false
    self.save
  end

  def toggle_publish
    if self.published
      self.unpublish
    else
      self.publish
    end
  end

  def get_selected_color_image(store_id)
    sp = self.shopify_products.find_by_store_id store_id
    return sp.get_selected_color.url
  end

  def as_json(*args)
    hash = super()
    cjson = []
    color_images.each do |image|
      cjson << image.as_json
    end
    hash.merge({
      color_images: cjson,
    })
  end
end
