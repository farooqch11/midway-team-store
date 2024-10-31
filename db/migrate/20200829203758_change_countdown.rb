class ChangeCountdown < ActiveRecord::Migration[5.2]
  def up
    # Step 1: Convert countdown to text to prepare for timestamp conversion
    change_column :stores, :countdown, 'text USING countdown::text', null: true
    # Step 2: Convert countdown from text to timestamp
    change_column :stores, :countdown, 'timestamp without time zone USING countdown::timestamp without time zone', null: true
  end

  def down
    # Rollback: Convert countdown back to integer
    change_column :stores, :countdown, 'integer USING countdown::integer', null: true
  end
end
