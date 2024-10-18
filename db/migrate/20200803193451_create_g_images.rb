class CreateGImages < ActiveRecord::Migration[5.2]
  def change
    create_table :g_images do |t|
      t.string :variant_id
      t.string :image
      t.string :shopify_product_id
      t.timestamps
    end
  end
end
