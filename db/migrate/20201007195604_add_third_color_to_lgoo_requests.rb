class AddThirdColorToLgooRequests < ActiveRecord::Migration[5.2]
  def change
    add_column :logo_requests, :third_color, :string, :null => true
  end
end
