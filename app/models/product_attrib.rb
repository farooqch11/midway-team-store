class ProductAttrib < ApplicationRecord
  belongs_to :product
  belongs_to :attrib
  belongs_to :color, :optional => true
end
