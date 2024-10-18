class CreateOrderItems < ActiveRecord::Migration[5.2]
  def change
    create_table :order_items do |t|
      t.string :title, :null => true
      t.string :shopify_id, :null => true
      t.decimal :price, :null => true
      t.decimal :fundraised, :null => true
      t.integer :quantity, :null => true
      t.integer :shopify_product_id, :null => true
      t.integer :order_id, :null => true
      t.timestamps
    end
  end
end
