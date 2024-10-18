class AddAttrToTeamAdmins < ActiveRecord::Migration[5.2]
  def change
    add_column :team_admins, :organization, :string, :null => true
    add_column :team_admins, :role, :string, :null => true
    add_column :team_admins, :organization_name, :string, :null => true
    add_column :team_admins, :team_number, :string, :null => true
    add_column :team_admins, :solution, :string, :null => true
    add_column :team_admins, :team_type, :string, :null => true
    add_column :team_admins, :sports, :string, :null => true
    add_column :team_admins, :phone, :string, :null => true
    #Ex:- add_column("admin_users", "username", :string, :limit =>25, :after => "email")
  end
end
