class ChangeTypeToAttribType < ActiveRecord::Migration[5.2]
  def change
    remove_column :attribs, :type
    add_column :attribs, :attrib_type, :string, :null => false
    #Ex:- add_column("admin_users", "username", :string, :limit =>25, :after => "email")
    #Ex:- change_column("admin_users", "email", :string, :limit =>25)
  end
end
