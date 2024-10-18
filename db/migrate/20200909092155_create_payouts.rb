class CreatePayouts < ActiveRecord::Migration[5.2]
  def change
    create_table :payouts do |t|
      t.date :month
      t.integer :store_id
      t.decimal :total, precision: 10, null: false
      t.string :status, :null => true
      t.string :full_name, :null => true
      t.text :address, :null => true
      t.timestamps
    end
    add_column :orders, :payout_id, :integer, :null => true
    #Ex:- add_column("admin_users", "username", :string, :limit =>25, :after => "email")
  end
end
