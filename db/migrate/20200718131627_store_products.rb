class StoreProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products_stores do |t|
      t.integer :product_id
      t.integer :store_id

      t.timestamps
    end
  end
end
