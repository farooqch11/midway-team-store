class GImage < ApplicationRecord
    belongs_to :shopify_product
    mount_base64_uploader :image, ImageUploader
end
