class ChangeCountdown < ActiveRecord::Migration[5.2]
  def up
    change_column :stores, :countdown, 'timestamp without time zone USING countdown::timestamp without time zone', null: true
  end

  def down 
    change_column :stores, :countdown, 'integer USING countdown::integer', null: true
  end
end
