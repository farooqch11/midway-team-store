class AddSelectedColorToShopifyProduct < ActiveRecord::Migration[5.2]
  def change
    add_column :shopify_products, :selected_color, :integer, :null => true
    #Ex:- add_column("admin_users", "username", :string, :limit =>25, :after => "email")
  end
end
