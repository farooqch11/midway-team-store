class AddBannerToLogos < ActiveRecord::Migration[7.2]
  def change
    add_column :logos, :banner, :boolean, default: false, null: false
  end
end
