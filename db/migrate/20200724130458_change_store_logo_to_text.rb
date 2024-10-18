class ChangeStoreLogoToText < ActiveRecord::Migration[5.2]
  def change
    change_column :stores, :logo_url, :text, :null => true
    
  end
end
