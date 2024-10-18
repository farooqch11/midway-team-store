class Order < ApplicationRecord
    belongs_to :team_admin
    belongs_to :store
    has_many :order_items
    belongs_to :payout, :optional => true

    scope :this_month, -> { where(created_at: Time.now.beginning_of_month..Time.now.end_of_month) }
    scope :last_month, -> {
        where( 'created_at > ? AND created_at < ?', 
                Date.today.last_month.beginning_of_month, 
                Date.today.beginning_of_month )}

    def get_qty
        qty = 0
        self.order_items.each do |item|
            qty += item.quantity
        end
        return qty
    end
    def week
        self.created_at.strftime('%b %d')
    end
    
    def month
        self.created_at.strftime('%Y %m')
    end
end
