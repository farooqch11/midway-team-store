class ShopifyProduct < ApplicationRecord
  belongs_to :store
  belongs_to :product
  belongs_to :logo, :optional => true
  has_many :g_images
  has_many :order_items
  has_many :prev_images
  mount_base64_uploader :image_url, ImageUploader

  def get_selected_color
    if self.selected_color == nil
      self.set_selected_color self.product.color_images.first
    end
    if self.selected_color != nil
      return self.product.color_images.find_by_id(self.selected_color)
    end
    return self.product.color_images.first
  end

  def get_selected_color_image
    if self.get_selected_color != nil
      return self.get_selected_color.url
    else
      return ""
    end
  end

  def get_image
    self.reload
    if self.image_url.url == nil
      return self.get_selected_color.url
    end
    return self.image_url.url
  end

  def set_selected_color(color_image)
    self.selected_color = color_image.id
    self.save
  end

  def set_essential
    self.essential = true
    self.save
  end

  def set_not_essential
    self.essential = false
    self.save
  end
end
