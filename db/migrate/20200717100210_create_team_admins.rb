class CreateTeamAdmins < ActiveRecord::Migration[5.2]
  def change
    create_table :team_admins do |t|
      t.string :first_name, :null => true
      t.string :last_name, :null => true
      t.string :email, :null => false
      t.string :password_digest, :null => false
      t.timestamps
    end
  end
end
