class Logo < ApplicationRecord
    belongs_to :store
    has_many :shopify_products

    has_one_attached :logo_file
end
