class AddFrozeToStores < ActiveRecord::Migration[5.2]
  def change
    add_column :stores, :froze, :boolean, :default => false
  end
end
