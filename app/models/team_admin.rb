class TeamAdmin < ApplicationRecord
  has_many :stores
  has_many :orders
  has_one :admin_info

  has_secure_password
  has_secure_token :access_token
  validates :email, presence: true
  def full_name
    return "#{self.first_name} #{self.last_name}"
  end
  def is_uniform?
    return true if self.solution.include?("Uniform")
    return true if self.solution.include?("uniform")
    return false
  end
  def get_total_sales
    total_sales = 0.0
    self.orders.each do |order|
      total_sales += order.price
    end
    return total_sales
  end
  def get_total_funds_raised
    total_funds_raised = 0.0
    self.orders.each do |order|
      total_funds_raised += order.fundraised
    end
    return total_funds_raised
  end

  def get_this_month_sales
    total_sales = 0.0
    self.orders.this_month.each do |order|
      total_sales += order.price
    end
    return total_sales
  end
  def get_this_month_funds_raised
    total_funds_raised = 0.0
    self.orders.this_month.each do |order|
      total_funds_raised += order.fundraised
    end
    return total_funds_raised
  end
  def get_last_month_sales
    total_sales = 0.0
    self.orders.last_month.each do |order|
      total_sales += order.price
    end
    return total_sales
  end
  def get_last_month_funds_raised
    total_funds_raised = 0.0
    self.orders.last_month.each do |order|
      total_funds_raised += order.fundraised
    end
    return total_funds_raised
  end
end
