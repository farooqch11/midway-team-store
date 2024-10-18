class ChangeCountdown < ActiveRecord::Migration[5.2]
  def up
    change_column :stores, :countdown, :datetime, :null => true
    # t.decimal :title, precision: 10, scale: 2
    #Ex:- change_column("admin_users", "email", :string, :limit =>25)
  end
  def down 
    change_column :stores, :countdown, :integer, :null => true
  end
end
