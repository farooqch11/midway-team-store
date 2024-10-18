class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.string :title, :null => false
      t.string :product_id, :null => false, :unique => true
      t.decimal :price, :null => false
      t.string :image_url, :null => false
      t.timestamps
    end
  end
end
