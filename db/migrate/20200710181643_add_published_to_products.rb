class AddPublishedToProducts < ActiveRecord::Migration[5.2]
  def change
    add_column :products, :published, :boolean, :default => true
    #Ex:- add_column("admin_users", "username", :string, :limit =>25, :after => "email")
  end
end
