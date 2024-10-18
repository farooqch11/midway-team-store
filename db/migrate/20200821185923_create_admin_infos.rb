class CreateAdminInfos < ActiveRecord::Migration[5.2]
  def change
    create_table :admin_infos do |t|
      t.integer :team_admin_id, :null => true
      t.string :address1, :null => true
      t.string :address2, :null => true
      t.string :country, :null => true
      t.string :full_name, :null => true
      t.string :city, :null => true
      t.string :state, :null => true
      t.string :zipcode, :null => true
      t.timestamps
    end
  end
end
