class CreatePrevImages < ActiveRecord::Migration[5.2]
  def change
    create_table :prev_images do |t|
      t.binary :image_url
      t.integer :shopify_product_id
      t.timestamps
    end
  end
end
