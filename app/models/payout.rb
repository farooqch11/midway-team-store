class Payout < ApplicationRecord
  belongs_to :store
  has_many :orders

  def set_status(status)
    self.status = status
    self.save
  end

  def get_status
    return "Payment sent" if self.status == "paid"
    return "Requested" if self.status == "requested"
  end

  def paid?
    return self.status == "paid"
  end
end
