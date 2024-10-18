class CreateColorImages < ActiveRecord::Migration[5.2]
  def change
    create_table :color_images do |t|
      t.string :url, :null => true
      t.string :color, :null => false
      t.string :product_id, :null => false
      t.timestamps
    end
  end
end
