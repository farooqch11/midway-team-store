class CreateShopifyProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :shopify_products do |t|
      t.string :store_id, :null => false
      t.string :product_id, :null => false

      t.string :image_url, :null => true
      t.string :shopify_id, :null => true
      t.decimal "price"
      t.timestamps
    end
  end
end
