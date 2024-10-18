class CreateStores < ActiveRecord::Migration[5.2]
  def change
    create_table :stores do |t|
      t.string :team_admin_id, :null => false
      t.string :title, :null => false
      t.string :logo_url, :null => true
      t.integer :fundraising
      t.timestamps
    end
  end
end
