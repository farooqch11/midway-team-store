class AddVariantIdToAttribs < ActiveRecord::Migration[7.2]
  def change
    add_column :attribs, :variant_id, :string
  end
end
