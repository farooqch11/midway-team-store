class CreateProductAttribs < ActiveRecord::Migration[5.2]
  def change
    create_table :product_attribs do |t|
      t.integer :product_id
      t.integer :attrib_id
      t.string :title
      t.string :color_id, :null => true
      t.timestamps
    end
  end
end
