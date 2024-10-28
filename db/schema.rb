# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.2].define(version: 2021_01_23_145936) do
  create_table "active_storage_attachments", charset: "utf8mb3", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", precision: nil, null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", charset: "utf8mb3", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", precision: nil, null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "admin_infos", charset: "utf8mb3", force: :cascade do |t|
    t.integer "team_admin_id"
    t.string "address1"
    t.string "address2"
    t.string "country"
    t.string "full_name"
    t.string "city"
    t.string "state"
    t.string "zipcode"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  create_table "attribs", charset: "utf8mb3", force: :cascade do |t|
    t.string "title", null: false
    t.string "handle", null: false
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.string "attrib_type", null: false
  end

  create_table "categories", charset: "utf8mb3", force: :cascade do |t|
    t.string "title", null: false
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  create_table "categories_products", charset: "utf8mb3", force: :cascade do |t|
    t.integer "product_id"
    t.integer "category_id"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  create_table "color_images", charset: "utf8mb3", force: :cascade do |t|
    t.string "url"
    t.string "color", null: false
    t.string "product_id", null: false
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  create_table "colors", charset: "utf8mb3", force: :cascade do |t|
    t.string "title"
    t.string "code"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  create_table "g_images", charset: "utf8mb3", force: :cascade do |t|
    t.string "variant_id"
    t.string "image"
    t.string "shopify_product_id"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  create_table "logo_params", charset: "utf8mb3", force: :cascade do |t|
    t.integer "pos_x", null: false
    t.integer "pos_y", null: false
    t.integer "width", null: false
    t.integer "height", null: false
    t.integer "product_id", null: false
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  create_table "logo_requests", charset: "utf8mb3", force: :cascade do |t|
    t.string "primary_color"
    t.string "secondary_color"
    t.string "mascot"
    t.text "description"
    t.boolean "processed", default: false
    t.integer "store_id"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.string "third_color"
  end

  create_table "logos", charset: "utf8mb3", force: :cascade do |t|
    t.string "store_id"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.boolean "main", default: false
  end

  create_table "order_items", charset: "utf8mb3", force: :cascade do |t|
    t.string "title"
    t.string "shopify_id"
    t.decimal "price", precision: 10
    t.decimal "fundraised", precision: 10
    t.integer "quantity"
    t.integer "shopify_product_id"
    t.integer "order_id"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  create_table "orders", charset: "utf8mb3", force: :cascade do |t|
    t.integer "team_admin_id"
    t.integer "store_id"
    t.string "title"
    t.decimal "price", precision: 10, null: false
    t.decimal "fundraised", precision: 10
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.string "shopify_id"
    t.integer "payout_id"
  end

  create_table "payouts", charset: "utf8mb3", force: :cascade do |t|
    t.date "month"
    t.integer "store_id"
    t.decimal "total", precision: 10, null: false
    t.string "status"
    t.string "full_name"
    t.text "address"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.string "tracking", default: "null"
  end

  create_table "prev_images", charset: "utf8mb3", force: :cascade do |t|
    t.binary "image_url"
    t.integer "shopify_product_id"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  create_table "product_attribs", charset: "utf8mb3", force: :cascade do |t|
    t.integer "product_id"
    t.integer "attrib_id"
    t.string "title"
    t.string "color_id"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  create_table "products", charset: "utf8mb3", force: :cascade do |t|
    t.string "title", null: false
    t.string "product_id", null: false
    t.decimal "price", precision: 10, null: false
    t.string "image_url"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.string "handle", null: false
    t.boolean "published", default: true
    t.text "tags"
    t.boolean "custom_product", default: false
    t.text "description"
    t.string "vendor"
  end

  create_table "products_stores", charset: "utf8mb3", force: :cascade do |t|
    t.integer "product_id"
    t.integer "store_id"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  create_table "shopify_products", charset: "utf8mb3", force: :cascade do |t|
    t.string "store_id", null: false
    t.string "product_id", null: false
    t.binary "image_url"
    t.string "shopify_id"
    t.decimal "price", precision: 10
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.string "logo_id"
    t.integer "selected_color"
    t.boolean "essential", default: false
    t.decimal "custom_base_price", precision: 10
    t.string "handle"
  end

  create_table "shops", charset: "utf8mb3", force: :cascade do |t|
    t.string "shopify_domain", null: false
    t.string "shopify_token", null: false
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.index ["shopify_domain"], name: "index_shops_on_shopify_domain", unique: true
  end

  create_table "stores", charset: "utf8mb3", force: :cascade do |t|
    t.string "team_admin_id", null: false
    t.string "title", null: false
    t.text "logo_url"
    t.integer "fundraising"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.string "collection"
    t.string "admin_token"
    t.datetime "countdown", precision: nil
    t.boolean "closed", default: false
    t.boolean "processing", default: false
    t.boolean "froze", default: false
  end

  create_table "team_admins", charset: "utf8mb3", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
    t.string "access_token"
    t.string "organization"
    t.string "role"
    t.string "organization_name"
    t.string "team_number"
    t.string "solution"
    t.string "team_type"
    t.string "sports"
    t.string "phone"
  end

  create_table "variant_images", charset: "utf8mb3", force: :cascade do |t|
    t.string "product_id"
    t.string "variant_id", null: false
    t.string "url"
    t.datetime "created_at", precision: nil, null: false
    t.datetime "updated_at", precision: nil, null: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
end
