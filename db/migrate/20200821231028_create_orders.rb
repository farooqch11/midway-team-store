class CreateOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :orders do |t|
      t.integer :team_admin_id
      t.integer :store_id
      t.string :title
      t.decimal :price, :null => false
      t.decimal :fundraised, :null => true
      t.timestamps
    end
  end
end
