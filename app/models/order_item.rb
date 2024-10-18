class OrderItem < ApplicationRecord
    belongs_to :order, :optional => true
    belongs_to :shopify_product, :optional => true
end
