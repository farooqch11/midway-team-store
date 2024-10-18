class AddEssentialToShopfiyProducts < ActiveRecord::Migration[5.2]
  def change
    add_column :shopify_products, :essential, :boolean, :null => true, :default => false
    #Ex:- add_column("admin_users", "username", :string, :limit =>25, :after => "email")
  end
end
