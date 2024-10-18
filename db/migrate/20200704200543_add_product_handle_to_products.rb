class AddProductHandleToProducts < ActiveRecord::Migration[5.2]
  def change
    add_column :products, :handle, :string, :null => false
  end
end
