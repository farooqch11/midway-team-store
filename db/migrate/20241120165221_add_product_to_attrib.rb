class AddProductToAttrib < ActiveRecord::Migration[7.2]
  def change
    add_reference :attribs, :product, null: false, foreign_key: true
  end
end
