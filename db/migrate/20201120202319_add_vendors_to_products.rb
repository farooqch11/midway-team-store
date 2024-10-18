class AddVendorsToProducts < ActiveRecord::Migration[5.2]
  def change
    add_column :products, :vendor, :string
  end
end
