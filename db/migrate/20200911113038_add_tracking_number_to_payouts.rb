class AddTrackingNumberToPayouts < ActiveRecord::Migration[5.2]
  def change
    add_column :payouts, :tracking, :string, :null => true, :default => :null
  end
end
