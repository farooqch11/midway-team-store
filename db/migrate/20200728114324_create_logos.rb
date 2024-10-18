class CreateLogos < ActiveRecord::Migration[5.2]
  def up
    create_table :logos do |t|
      t.string :store_id
      t.timestamps
    end
    add_column :shopify_products, :logo_id, :string
    # drop_table :logos
  end
  def down 
    drop_table :logos
  end
end
