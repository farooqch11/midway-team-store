class CreateAttribs < ActiveRecord::Migration[5.2]
  def change
    create_table :attribs do |t|
      t.string :type, :null => false
      t.string :title, :null => false
      t.string :handle, :null => false, :unique => true
      t.timestamps
    end
  end
end
