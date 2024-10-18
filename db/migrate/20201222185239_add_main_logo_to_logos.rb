class AddMainLogoToLogos < ActiveRecord::Migration[5.2]
  def change
    add_column :logos, :main, :boolean, :default => false
  end
end
