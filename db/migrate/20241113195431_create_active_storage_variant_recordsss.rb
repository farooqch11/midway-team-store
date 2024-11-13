class CreateActiveStorageVariantRecordsss < ActiveRecord::Migration[7.2]
  def change
    # Ensure `active_storage_blobs` table exists
    return unless table_exists?(:active_storage_blobs)

    # Ensure `active_storage_variant_records` table only gets created if it doesn’t exist
    create_table :active_storage_variant_records, if_not_exists: true do |t|
      # Ensure blob references the correct primary key type
      t.belongs_to :blob, null: false, index: false, type: blobs_primary_key_type
      t.string :variation_digest, null: false

      # Ensure uniqueness on `blob_id` and `variation_digest`
      t.index %i[blob_id variation_digest], name: "index_active_storage_variant_records_uniqueness", unique: true
      
      # Add a foreign key constraint to `blob_id` column
      t.foreign_key :active_storage_blobs, column: :blob_id
    end
  end

  private

  # Determine the primary key type for the `active_storage_blobs` table
  def blobs_primary_key_type
    pkey_name = connection.primary_key(:active_storage_blobs)
    pkey_column = connection.columns(:active_storage_blobs).find { |c| c.name == pkey_name }
    pkey_column&.bigint? ? :bigint : pkey_column&.type || :integer
  end
end
