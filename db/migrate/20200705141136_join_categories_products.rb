class JoinCategoriesProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :categories_products do |t|
      t.integer :product_id
      t.integer :category_id

      t.timestamps
    end
  end
end
