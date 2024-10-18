class AddProcessingToStores < ActiveRecord::Migration[5.2]
  def change
    add_column :stores, :processing, :boolean, :default => false
  end
end
