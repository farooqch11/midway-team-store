class AddCustomPriceSupport < ActiveRecord::Migration[5.2]
  def change
    add_column :shopify_products, :custom_base_price, :decimal, precision: 10, :null => true, :default => :null
  end
end
