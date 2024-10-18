class ChangeImageUrlToText < ActiveRecord::Migration[5.2]
  def up
    change_column :shopify_products, :image_url, :binary, :null => true
    #Ex:- change_column("admin_users", "email", :string, :limit =>25)
  end
  def down
    change_column :shopify_products, :image_url, :string, :null => true
  end
end
