class ChangeImageUrlToText < ActiveRecord::Migration[5.2]
  def up
    change_column :shopify_products, :image_url, :string, null: true
  end

  def down
    change_column :shopify_products, :image_url, :string, null: true
  end
end