class PrevImage < ApplicationRecord
  belongs_to :shopify_product
  mount_base64_uploader :image_url, ImageUploader
end
