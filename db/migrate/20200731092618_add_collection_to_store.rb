class AddCollectionToStore < ActiveRecord::Migration[5.2]
  def change
    add_column :stores, :collection, :string, :null => true
    #Ex:- add_column("admin_users", "username", :string, :limit =>25, :after => "email")
  end
end
