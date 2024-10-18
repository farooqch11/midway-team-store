class VariantImage < ApplicationRecord
    belongs_to :product
    # mount_base64_uploader :image_url, ImageUploader
end
