class AddHandleShopfyProduct < ActiveRecord::Migration[5.2]
  def change
    add_column :shopify_products, :handle, :string
  end
end
