class CreateLogoParams < ActiveRecord::Migration[5.2]
  def change
    create_table :logo_params do |t|
      t.integer :pos_x, :null => false
      t.integer :pos_y, :null => false
      t.integer :width, :null => false
      t.integer :height, :null => false
      t.integer :product_id, :null => false
      t.timestamps
    end
  end
end
