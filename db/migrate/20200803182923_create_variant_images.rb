class CreateVariantImages < ActiveRecord::Migration[5.2]
  def change
    create_table :variant_images do |t|
      t.string :product_id, :null => true
      t.string :variant_id, :null => false
      t.string :url, :null => true
      t.timestamps
    end
    change_column :products, :image_url, :string, :null => true
    #Ex:- change_column("admin_users", "email", :string, :limit =>25)
  end
end
