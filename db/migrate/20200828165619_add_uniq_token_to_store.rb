class AddUniqTokenToStore < ActiveRecord::Migration[5.2]
  def change
    add_column :stores, :admin_token, :string, :null => true
    #Ex:- add_column("admin_users", "username", :string, :limit =>25, :after => "email")
  end
end
