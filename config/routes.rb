require "sidekiq/web"
Rails.application.routes.draw do
  authenticate :user, ->(user) { user.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end

  root :to => "home#index"
  mount ShopifyApp::Engine, at: "/"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  scope :admin do
    get "/", :to => "admin#index", :as => "admin_index"
    get "/products", :to => "admin#products", :as => "admin_products"

    get "/categories", :to => "admin#categories", :as => "admin_categories"
    post "/categories/new", :to => "admin#categories_new", :as => "admin_categories_new"
    patch "/categories/edit/:id", :to => "admin#categories_edit", :as => "admin_categories_edit"
    get "/categories/delete/:id", :to => "admin#categories_delete", :as => "admin_categories_delete"

    get "/refresh_products", :to => "admin#fetch_products_from_shopify", :as => "admin_refresh_products"

    # produts api routes
    get "/fetch_search_products/:query", :to => "admin#fetch_search_products", :as => "admin_search_products_json"
    get "/fetch_search_products_not_in_cat/:category_id/:query", :to => "admin#fetch_search_products_not_in_cat", :as => "admin_search_products_not_in_category_json"
    get "/add_product_to_cat/:category_id/:product_id", :to => "admin#add_product_to_cat", :as => "admin_add_product_to_category"
    get "/remove_product_from_cat/:category_id/:product_id", :to => "admin#remove_product_from_cat", :as => "admin_remove_product_from_cat"
    post "/publish_product/:product_id", :to => "admin#publish_product", :as => "admin_publish_product"
    post "/unpublish_product/:product_id", :to => "admin#unpublish_product", :as => "admin_unpublish_product"
    post "/toggle_publish_product/:product_id", :to => "admin#toggle_publish_product", :as => "admin_toggle_publish_product"

    # collction api routes
    get "/fetch_search_categories/:query", :to => "admin#fetch_search_categories", :as => "admin_search_categories_json"
    get "/add_cat_to_product/:product_id/:category_id", :to => "admin#add_cat_to_product", :as => "admin_add_category_to_product"
    get "/remove_cat_from_product/:product_id/:category_id", :to => "admin#remove_cat_from_product", :as => "remove_cat_from_product"

    post "/add_all_to_category/:category_id", :to => "admin#add_all_to_category", :as => "admin_add_all_to_category"
    post "/remove_all_from_category/:category_id", :to => "admin#remove_all_from_category", :as => "admin_remove_all_from_category"
    post "/publish_bulk/", :to => "admin#publish_bulk", :as => "admin_publish_bulk"
    post "/unpublish_bulk/", :to => "admin#unpublish_bulk", :as => "admin_unpublish_bulk"
    post "/product_delete/", :to => "admin#product_delete", :as => "admin_product_delete"
    post "/product_bulk_delete/", :to => "admin#product_bulk_delete", :as => "admin_product_bulk_delete"

    # store custom product api routes
    get "/fetch_search_stores/:query", :to => "admin#fetch_search_stores", :as => "admin_search_stores_json"
    get "/add_store_to_product/:product_id/:store_id", :to => "admin#add_store_to_product", :as => "admin_add_store_to_product"
    get "/remove_store_from_product/:product_id/:store_id", :to => "admin#remove_store_from_product", :as => "remove_store_from_product"

    #
    get "/custom_products", :to => "admin#custom_products", :as => "admin_custom_products"
    get "/refresh_custom_products", :to => "admin#fetch_custom_products_from_shopify", :as => "admin_refresh_custom_products"

    #attrib routes
    scope :attributes do
      get "/", :to => "admin#attributes", :as => "admin_attributes"
      post "/new", :to => "admin#attributes_new", :as => "admin_attributes_new"
      patch "/update/:id", :to => "admin#attributes_update", :as => "admin_attributes_update"
      get "/delete/:id", :to => "admin#attributes_delete", :as => "admin_attributes_delete"
      post "/add_to_product/", :to => "admin#attributes_add_to_product", :as => "admin_attributes_add_to_product"
      post "/remove_from_product/", :to => "admin#attributes_remove_from_product", :as => "admin_attributes_remove_from_product"
    end
    #attrib routes
    scope :colors do
      get "/", :to => "admin#colors", :as => "admin_colors"
      post "/new", :to => "admin#colors_new", :as => "admin_colors_new"
      patch "/update/:id", :to => "admin#colors_update", :as => "admin_colors_update"
      get "/delete/:id", :to => "admin#colors_delete", :as => "admin_colors_delete"
    end

    scope :stores do
      get "/", :to => "admin#stores", :as => "admin_stores"

      get "/delete/:id", :to => "admin#stores_delete", :as => "admin_stores_delete"
      scope "/:id" do
        get "/orders", :to => "admin#stores_orders", :as => "admin_stores_orders"
        get "/payouts", :to => "admin#stores_payouts", :as => "admin_stores_payouts"
        get "/logos", :to => "admin#stores_logos", :as => "admin_stores_logos"
        get "/logos/delete", :to => "admin#store_logo_delete", :as => "admin_store_logo_delete"
        post "/logos", :to => "admin#store_logo_upload", :as => "admin_store_logo_upload"
        get "/payouts/paid/:pid", :to => "admin#stores_payout_set_paid", :as => "admin_stores_payout_set_paid"
        post "/payouts/tracking/", :to => "admin#stores_payout_set_tracking", :as => "admin_stores_payout_set_tracking"
      end
    end
    scope :team_admins do
      get "/", :to => "admin#team_admins", :as => "admin_team_admins"
      get "/delete/:id", :to => "admin#team_admins_delete", :as => "admin_team_admins_delete"

      scope "/:id" do
        get "/orders", :to => "admin#team_admins_orders", :as => "admin_team_admins_orders"
        get "/details", :to => "admin#team_admins_details", :as => "admin_team_admins_details"
        get "/store_gen_token", :to => "admin#team_admin_store_generate_link", :as => "admin_team_admin_store_generate_link"
      end
    end

    scope :payouts do
      get "/", :to => "admin#payouts", :as => "admin_payouts"
    end

    scope :orders do
      get "/", :to => "admin#orders", :as => "admin_orders"
    end

    scope :all_tags do
      get "/", :to => "admin#all_tags", :as => "admin_all_tags"
      post "/delete", :to => "admin#all_tags_delete", :as => "admin_all_tags_delete"
    end

    scope :logo_requests do
      get "/", :to => "admin#logo_requests", :as => "admin_logo_requests"
    end
    # logo params api routes
    get "/fetch_logo_params/:product_id", :to => "admin#fetch_logo_params", :as => "admin_fetch_logo_params"
    post "/save_logo_params/:product_id", :to => "admin#save_logo_params", :as => "admin_save_logo_params"
  end

  scope "a/locker" do
    get "/", :to => "client#getstarted", :as => "get_started"
    get "/signup", :to => "client#signup", :as => "signup"
    post "/signup", :to => "client#signup", :as => "create_account"
    post "/signup_post", :to => "client#signup_post", :as => "create_account_post"
    get "/login", :to => "client#login", :as => "login"
    post "/logout", :to => "client#logout", :as => "logout"
    post "/login", :to => "client#login", :as => "process_login"
    post "/verify_admin", :to => "client#verify_admin", :as => "verify_admin"

    scope :store do
      get "/", :to => "store_front#find", :as => "store_front_find"
      post "/", :to => "store_front#search", :as => "store_front_search"
      get "/:collection_id", :to => "store_front#index", :as => "store_front_index"
    end
    scope :api do
      post "/get_products", :to => "client_api#get_products", :as => "api_get_products"
    end

    scope :dashboard do
      scope :store do
        get "/all", :to => "store#all", :as => "all_stores"
        get "/", :to => "store#create", :as => "store_create"
        post "/", :to => "store#save", :as => "store_save"
        get "/delete/:store_id", :to => "store#delete", :as => "store_delete"
        get "/:id", :to => "store#setup", :as => "store_setup"
        get "/:id/logo", :to => "store#logo_setup", :as => "store_logo_setup"
        post "/publish/:id", :to => "store#publish_store", :as => "store_publish"

        get "/:id/logos", :to => "store#manage_logos", :as => "store_manage_logos"

        get "/:id/:access_token/:store_id/orders", :to => "store#orders", :as => "store_orders"
        get "/:id/:access_token/:store_id/payouts", :to => "store#payouts", :as => "store_payouts"
        get "/:id/:access_token/:store_id/analytics", :to => "store#analytics", :as => "store_analytics"

        post "/add_products_to_store", :to => "store#add_product_to_store", :as => "store_add_products"
        post "/remove_products_to_store", :to => "store#remove_product_to_store", :as => "store_remove_products"
        post "/upload/logo/:id", :to => "store#upload_logo", :as => "store_logo_upload"
        get "/delete/logo/:id/:logo_id", :to => "store#delete_logo", :as => "store_logo_delete"
        get "/set_main/logo/:id/:logo_id", :to => "store#set_main_logo", :as => "store_logo_set_main"
        post "/upload/images/:id", :to => "store#upload_images", :as => "store_images_upload"
        post "/upload/g_image/:id/:variant_id", :to => "store#upload_g_image", :as => "store_g_images_upload"
        post "/set_product_color/", :to => "store#set_product_color", :as => "store_set_product_color"
        post "/set_product_logo/", :to => "store#set_product_logo", :as => "store_set_product_logo"
        post "/delete_logo_product/", :to => "store#delete_logo_product", :as => "store_delete_logo_product"
        post "/remove_logo_image", :to => "store#remove_logo_image", :as => "store_remove_logo_image"
        post "/:id/raise", :to => "store#fundraise", :as => "store_fundraise"
        post "/:id/request_logo", :to => "store#request_logo", :as => "store_request_logo"
        post "/toggle_essential", :to => "store#toggle_essential", :as => "store_toggle_essential"
        post "/:id/set_countdown", :to => "store#set_countdown", :as => "store_set_countdown"
        post "/update_price_tag", :to => "store#update_price_tag", :as => "store_update_price_tag"

        post "/request_payout/:store_id/:month", :to => "store#request_payout", :as => "store_request_payout"
      end

      scope "/account/:id/:access_token" do
        get "/settings", :to => "account#settings", :as => "account_settings"
      end
      scope :account do
        post "/save_payment_info", :to => "account#save_payment_info", :as => "account_save_payment_info"
        post "/save_general_info", :to => "account#save_general_info", :as => "account_save_general_info"
      end
    end
  end
end
