class AddColorToAttribs < ActiveRecord::Migration[7.2]
  def change
    add_column :attribs, :color, :string
  end
end
