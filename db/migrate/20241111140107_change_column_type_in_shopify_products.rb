class ChangeColumnTypeInShopifyProducts < ActiveRecord::Migration[7.2]
  def change
    change_column :shopify_products, :product_id, 'bigint USING product_id::bigint'
    change_column :shopify_products, :store_id, 'bigint USING store_id::bigint'
  end

  def down
    change_column :shopify_products, :product_id, 'string USING product_id::varchar'
    change_column :shopify_products, :store_id, 'string USING store_id::varchar'
  end
end
