class Color < ApplicationRecord
  has_many :product_attribs

  def handle
    return self.title.parameterize
  end
end
