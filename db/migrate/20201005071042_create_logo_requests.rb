class CreateLogoRequests < ActiveRecord::Migration[5.2]
  def change
    create_table :logo_requests do |t|
      t.string :primary_color, :null => true
      t.string :secondary_color, :null => true
      t.string :mascot, :null => true
      t.text :description, :null => true
      t.boolean :processed, :default => false
      t.integer :store_id, :null => true
      t.timestamps
    end
  end
end
