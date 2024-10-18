class AddTokenToTeamAdmins < ActiveRecord::Migration[5.2]
  def change
    add_column :team_admins, :access_token, :string, :unique => true, :null => true
  end
end
