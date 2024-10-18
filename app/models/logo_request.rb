class LogoRequest < ApplicationRecord
  has_one_attached :reference
  belongs_to :store, :optional => true
end
