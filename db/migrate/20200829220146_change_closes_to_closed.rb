class ChangeClosesToClosed < ActiveRecord::Migration[5.2]
  def change
    remove_column :stores, :closes
    add_column :stores, :closed, :boolean, :default => false
    #Ex:- add_column("admin_users", "username", :string, :limit =>25, :after => "email")
  end
end
