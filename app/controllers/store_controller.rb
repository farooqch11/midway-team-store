class StoreController < ApplicationController
  include ShopifyApp::AppProxyVerification
  layout "client"
  before_action :define_vars
  before_action :check_unique_admin, :only => [:setup]

  def request_payout
    p = params.permit :month, :store_id, :full_name, :address, :city, :country, :zip
    address = p[:address]
    address = "#{address}, #{p[:city]}" if p.key?(:city)
    address = "#{address}, #{p[:country]}" if p.key?(:country)
    address = "#{address}, #{p[:zip]}" if p.key?(:zip)

    store = Store.find_by_id p[:store_id]
    if store
      payout = nil
      payout_orders = nil
      store.orders.order(:created_at).reverse_order.group_by(&:month).each do |month, orders|
        if p[:month] == month
          payout_orders = orders
          break
        end
      end
      puts "inpsect"
      puts payout_orders.first.payout.inspect
      if payout_orders.first.payout == nil
        total = 0.0
        payout_orders.each do |p| total += p.fundraised end
        payout = Payout.new
        payout.store = store
        payout.total = total
        payout.month = Date.new(p[:month].split(" ").first.to_i, p[:month].split(" ").last.to_i)
        payout.orders = payout_orders
        payout.full_name = p[:full_name]
        payout.address = address
        payout.save
        payout.set_status :requested
      else
        payout = payout_orders.first.payout
      end
      # puts payout_orders.inspect
      # render :json => {
      #   orders: payout_orders,
      #   payout: payout
      # }
      redirect_to store_payouts_path(:id => store.id, :access_token => store.team_admin.access_token, :t => store.team_admin.access_token)
    end
  end

  def create
    @store_design = true
    p = params.permit :access_token
    team_admin = TeamAdmin.find_by_access_token p[:access_token]
    if team_admin
      s = Store.new
      s.title = "Untitled"
      s.team_admin = team_admin
      s.save
      redirect_to store_setup_path(:id => s.id, :t => team_admin.access_token)
    else
      redirect_to all_stores_path
    end
    # render(content_type: "application/liquid")
  end

  def delete
    p = params.permit :t, :id, :store_id
    if p[:t] == nil
      redirect_to login_path
      return
    end
    if p.key? :id
      @team_admin = TeamAdmin.find_by_id p[:id]

      if @team_admin
        if @team_admin.access_token != p[:t]
          redirect_to :action => "create"
          return
        end
        @stores = @team_admin.stores
        s = Store.find p[:store_id]
        if s.team_admin == @team_admin
          s.froze = true
          s.save
          StoreDeleteJob.perform_later(s)
          redirect_to all_stores_path(:id => s.team_admin.id, :t => s.team_admin.access_token)
        else
          redirect_to :action => "create"
        end
      else
        redirect_to :action => "create"
      end
    else
      redirect_to :action => "create"
    end
  end

  def payouts
    access_token_auth

    p = params.permit :store_id
    @store = nil
    begin
      @store = Store.find p[:store_id]
    rescue
    end
    if !@store
      redirect_to all_stores_path
    end
    render(content_type: "application/liquid")
  end

  def orders
    access_token_auth

    p = params.permit :store_id
    @store = nil
    begin
      @store = Store.find p[:store_id]
    rescue
    end
    if !@store
      redirect_to all_stores_path
    end
    render(content_type: "application/liquid")
  end

  def analytics
    access_token_auth

    p = params.permit :store_id
    @store = nil
    begin
      @store = Store.find p[:store_id]
    rescue
    end
    if !@store
      redirect_to all_stores_path
    end

    @months = []
    @total_orders = []
    @total_funds = []
    # @orders = @store.orders.group_by { |t| t.created_at.strftime("%B/%Y")}
    # @orders = @store.orders.order("date_trunc('week', created_at)")
    @orders = @store.orders.order(:created_at).group_by(&:week)
    puts @orders.inspect
    @orders.each do |key, value|
      @months << key
      @total_orders << value.size

      funds = 0.0
      value.each do |val|
        funds += val.fundraised
      end
      rfunds = funds / 100.0
      rfunds = rfunds + @total_funds.last if @total_funds.last != nil
      @total_funds << rfunds
    end
    # @or = @store.orders.group_by_day(:created_at, range: 1.weeks.ago.midnight..Time.now).count
    # puts @or.inspect

    render(content_type: "application/liquid")
  end

  def all
    p = params.permit :t, :id
    if p[:t] == nil
      redirect_to login_path
      return
    end
    if p.key? :id
      @team_admin = TeamAdmin.find_by_id p[:id]

      if @team_admin
        if @team_admin.access_token != p[:t]
          redirect_to :action => "create"
          return
        end
        @stores = @team_admin.stores
        render(content_type: "application/liquid")
      else
        redirect_to :action => "create"
      end
    else
      redirect_to :action => "create"
    end
  end

  def save
    p = params.permit :name, :team_admin
    title = p[:name]
    title = "Untitled" if p[:name].empty?

    team_admin = TeamAdmin.find_by_id p[:team_admin]
    if team_admin
      s = Store.new
      s.title = title
      s.team_admin = team_admin
      s.save
      redirect_to store_setup_path(:id => s.id, :t => team_admin.access_token)
    else
      @alerts << {
        :type => "danger",
        :text => "You are not authorized",
      }
      render("create", content_type: "application/liquid")
    end
  end

  def setup
    @store_design = true
    @store = false
    p = params.permit :uuit, :t, :id
    if !p.key?(:id)
      redirect_to :action => "create"
      return
    end
    begin
      @store = Store.find p[:id]
    rescue
      @store = false
    end
    if @store
      @team_admin = @store.team_admin
      if p.key? :uuit
        if @store.admin_token != p[:uuit]
          redirect_to :action => "create"
          return
        else
          @unique_admin = true
        end
      else
        if @team_admin.access_token != p[:t]
          redirect_to :action => "create"
          return
        end
      end
    else
      redirect_to :action => "create"
      return
    end

    # store = Store.find(p[:id])
    # if store.admin_token == p[:uuit]
    #   @unique_admin = true
    # end
    # puts @unique_admin.inspect
    # if p.key?(:id) and !@unique_admin
    #   @store = Store.find_by_id p[:id]
    #   @team_admin = @store.team_admin
    #   if !@store
    #     redirect_to :action => "create"
    #     return
    #   else
    #     if @team_admin.access_token != p[:t]
    #       redirect_to :action => "create"
    #       return
    #     end
    #   end
    # else
    #   if !p.key?(:id)
    #     redirect_to :action => "create"
    #     return
    #   end
    # end

    @categories = Category.all
    @attributes = Attrib.all
    render(content_type: "application/liquid")
  end

  def logo_setup
    @store_design = true
    @store = false
    p = params.permit :uuit, :t, :id, :xs_prompt
    if !p.key?(:id)
      redirect_to :action => "create"
      return
    end
    begin
      @store = Store.find p[:id]
    rescue
      @store = false
    end
    if @store
      @team_admin = @store.team_admin
      if p.key? :uuit
        if @store.admin_token != p[:uuit]
          redirect_to :action => "create"
          return
        else
          @unique_admin = true
        end
      else
        if @team_admin.access_token != p[:t]
          redirect_to :action => "create"
          return
        end
      end

      @zerologoparams = LogoParam.new(pos_x: 0, pos_y: 0, width: 0, height: 0)
    else
      redirect_to :action => "create"
      return
    end

    # p = params.permit :id, :t
    # if p.key? :id
    #   @store = Store.find_by_id p[:id]
    #   if @store
    #     @team_admin = @store.team_admin
    #     if @team_admin.access_token != p[:t]
    #       redirect_to :action => "create"
    #       return
    #     end

    #   else
    #     redirect_to :action => "create"
    #   end
    # else
    #   redirect_to :action => "create"
    # end

    if p.key?("xs_prompt")
      @xs_prompt = p[:xs_prompt]
    end

    render(content_type: "application/liquid")
  end

  def publish_store
    @store = false
    p = params.permit :uuit, :t, :id, :title
    if !p.key?(:id)
      redirect_to :action => "create"
      return
    end
    begin
      @store = Store.find p[:id]
    rescue
      @store = false
    end
    if @store
      @team_admin = @store.team_admin
      if p.key? :uuit
        if @store.admin_token != p[:uuit]
          redirect_to :action => "create"
          return
        else
          @unique_admin = true
        end
      else
        if @team_admin.access_token != p[:t]
          redirect_to :action => "create"
          return
        end
      end
    else
      redirect_to :action => "create"
      return
    end

    @store.title = p[:title]
    @store.save

    # p = params.permit :id, :t
    # if p.key? :id
    #   @store = Store.find_by_id p[:id]
    #   if @store
    #     @team_admin = @store.team_admin
    #     if @team_admin.access_token != p[:t]
    #       redirect_to :action => "create"
    #       return
    #     end

    #   else
    #     redirect_to :action => "create"
    #   end
    # else
    #   redirect_to :action => "create"
    # end
    shop = Shop.first
    shop.with_shopify_session do
      collection = get_store_collection @store
      collection.products.each do |pr|
        puts @store.has_product_with_shopify_id(pr.id)
        if !@store.has_product_with_shopify_id(pr.id)
          pr.destroy
        end
      end
      @store.processing = true
      @store.closed = false
      @store.save

      PublishStoreJob.perform_later @store
    end
    render :json => {
      store: @store,
      link: store_front_index_path(@store.collection),
      collection: @store.collection,
    }
  end

  def fundraise
    # p = params.permit :id, :t, :fundraise
    @store = false
    p = params.permit :uuit, :t, :id, :fundraise
    if !p.key?(:id)
      redirect_to :action => "create"
      return
    end
    begin
      @store = Store.find p[:id]
    rescue
      @store = false
    end
    if @store
      @team_admin = @store.team_admin
      if p.key? :uuit
        if @store.admin_token != p[:uuit]
          redirect_to :action => "create"
          return
        else
          @unique_admin = true
        end
      else
        if @team_admin.access_token != p[:t]
          redirect_to :action => "create"
          return
        end
      end
    else
      redirect_to :action => "create"
      return
    end
    # if p.key? :id
    #   @store = Store.find_by_id p[:id]
    #   if @store
    #     @team_admin = @store.team_admin
    #     if @team_admin.access_token != p[:t]
    #       redirect_to :action => "create"
    #       return
    #     end

    #   else
    #     redirect_to :action => "create"
    #   end
    # else
    #   redirect_to :action => "create"
    # end
    @store.fundraising = p[:fundraise]
    @store.save
    products = setup_fundraise @store

    render :json => {
      store: @store,
      products: products,
    }
  end

  def setup_fundraise(s)
    prs = []
    s.shopify_products.each do |sp|
      p = sp.product
      next if !p
      price_to_be = p.price
      dp = p.price.to_f

      if sp.custom_base_price != nil
        dp = sp.custom_base_price
      end
      if s.fundraising != nil and s.fundraising != 0
        price_to_be = dp * s.fundraising.to_f
        price_to_be = price_to_be / 100.0
        price_to_be = price_to_be + dp
        dp = price_to_be
      end
      sp.price = price_to_be
      sp.save

      puts dp.inspect
      prs << {
        id: sp.id,
        price: dp,
      }
    end
    return prs
  end

  def get_store_collection(store)
    coll = nil
    if store.collection == nil
      coll = create_store_collection(store)
    else
      begin
        coll = ShopifyAPI::CustomCollection.find(store.collection)
      rescue
        coll = create_store_collection(store)
      end
      # puts collection.inspect
    end

    return coll
  end

  def create_store_collection(store)
    coll = ShopifyAPI::CustomCollection.new
    coll.title = store.title
    coll.save
    metafield = ShopifyAPI::Metafield.new({
      :description => "XS Midway",
      :namespace => "xsmidway",
      :key => "custom",
      :value => "true",
      :value_type => "string",
    })
    coll.add_metafield(metafield)

    store.collection = coll.id
    store.save
    return coll
  end

  def manage_logos
    p = params.permit :id, :t
    if p.key? :id
      @store = Store.find_by_id p[:id]
      if @store
        @team_admin = @store.team_admin
        if @team_admin.access_token != p[:t]
          redirect_to :action => "create"
          return
        end

        render(content_type: "application/liquid")
      else
        redirect_to :action => "create"
      end
    else
      redirect_to :action => "create"
    end
  end

  def request_logo
    p = params.permit :id, :primary_color, :secondary_color, :third_color, :description, :mascot, :reference
    r = LogoRequest.new
    r.primary_color = p[:primary_color]
    r.secondary_color = p[:secondary_color]
    r.third_color = p[:third_color]
    r.description = p[:description]
    r.mascot = p[:mascot]
    r.store_id = p[:id]
    r.save
    r.reference.attach p[:reference]

    store = Store.find(p[:id])
    redirect_to store_logo_setup_path(:id => p[:id], :t => store.team_admin.access_token, :xs_prompt => "Logo Requested")
  end

  def upload_logo
    p = params.permit :id, :xs_logo, :redirect_to_store, :uuit
    store = Store.find_by_id p[:id]
    logo = Logo.new
    logo.store = store
    logo.logo_file.attach p[:xs_logo]
    logo.save

    store.save
    # render :json => {
    #   store: store
    # }
    # byebug
    team_admin = store.team_admin
    if p.include? :uuit
      if p.include? :redirect_to_store
        redirect_to store_logo_setup_path(:id => store.id, :uuit => p[:uuit], :apply_logo => logo.id)
      else
        redirect_to store_manage_logos_path(:id => store.id, :uuit => p[:uuit])
      end
    else
      if p.include? :redirect_to_store
        redirect_to store_logo_setup_path(:id => store.id, :t => team_admin.access_token, :apply_logo => logo.id)
      else
        redirect_to store_manage_logos_path(:id => store.id, :t => team_admin.access_token)
      end
    end
  end

  def delete_logo
    p = params.permit :id, :logo_id
    store = Store.find_by_id p[:id]

    puts store.logo_ids
    if store.logo_ids.include? p[:logo_id].to_i
      logo = Logo.find_by_id p[:logo_id]
      logo.delete

      team_admin = store.team_admin
      redirect_to store_manage_logos_path(:id => store.id, :t => team_admin.access_token)
    else
      redirect_to all_stores_path
    end

    # team_admin = store.team_admin
    # redirect_to store_logo_setup_path(:id => store.id, :t => team_admin.access_token)
  end

  def set_main_logo
    p = params.permit :id, :logo_id
    store = Store.find_by_id p[:id]

    store.set_main_logo p[:logo_id]

    redirect_to store_manage_logos_path(:id => store.id, :t => store.team_admin.access_token)
  end

  def upload_images
    p = params.permit :id, :product_id, :image
    sp = ShopifyProduct.find_by_id p[:product_id]

    sp.image_url = p[:image]
    pi = PrevImage.new
    pi.shopify_product = sp
    pi.image_url = p[:image]

    pi.save
    sp.save!
    render :json => {
      product: sp,
    }
  end

  def remove_logo_image
    p = params.permit :id
    begin
      sp = ShopifyProduct.find p[:id]
      sp.remove_image_url!
      sp.save
      sp.reload
      render :json => {
        :image => sp.get_image,
      }
    rescue
    end
  end

  def upload_g_image
    p = params.permit :image, :id, :variant_id
    gimage = []

    if p.key? :image
      sp = ShopifyProduct.find(p[:id])
      gimage = sp.g_images.find_by_variant_id p[:variant_id]

      if !gimage
        gimage = GImage.new
        gimage.variant_id = p[:variant_id]
        gimage.shopify_product = sp
      end
      gimage.save
      gimage.image = p[:image]
      gimage.save!
    end
    render :json => {
      image: gimage.image.url,
      obj: gimage,
      errors: gimage.errors,
    }
  end

  def publishs_store(store)
    shop = Shop.first
    shop.with_shopify_session do
      collection = nil
      if store.collection == nil
        coll = ShopifyAPI::CustomCollection.new
        coll.title = store.title
        coll.save
        metafield = ShopifyAPI::Metafield.new({
          :description => "XS Midway",
          :namespace => "xsmidway",
          :key => "custom",
          :value => "true",
          :value_type => "string",
        })
        coll.add_metafield(metafield)

        store.collection = coll.id
        store.save
        collection = coll
        puts coll.inspect
        puts metafield.errors.inspect
      else
        collection = ShopifyAPI::CustomCollection.find(store.collection)
        # puts collection.inspect
      end

      store.shopify_products.each do |store_product|
        product = store_product.product

        if store_product.shopify_id == nil
          # begin
          shopify_product = ShopifyAPI::Product.find(product.product_id.to_i)

          new_product = ShopifyAPI::Product.new
          new_product.title = shopify_product.title
          new_product.body_html = shopify_product.body_html
          new_product.vendor = shopify_product.vendor
          new_product.product_type = "[CUSTOM STORE - Please do not delete]"
          new_product.options = []
          new_product.variants = []
          puts new_product.inspect
          shopify_product.options.each do |o|
            new_product.options << {
              name: o.name,
              values: o.values,
            }
          end
          shopify_product.variants.each do |v|
            new_product.variants << {
              option1: v.option1,
              option2: v.option2,
              option3: v.option3,
              title: v.title,
              price: v.price,
            }
          end

          if new_product.save
            store_product.shopify_id = new_product.id
            store_product.save
            collection.add_product new_product
            variant_ids = []

            if !store_product.image_url.file.nil?
              image = ShopifyAPI::Image.new
              image.src = store_product.image_url.url
              image.variant_ids = []
              image.prefix_options[:product_id] = new_product.id
              image.save
              puts image.errors.inspect
            end

            store_product.g_images.each do |g_image|
              variant = nil
              puts "GIMAGE #{g_image.variant_id}"
              shopify_product.variants.each do |v|
                if g_image.variant_id.to_i == v.id.to_i
                  variant = v
                  break
                end
              end

              if variant
                puts "found variant #{variant.id}"
                id = nil
                new_product.variants.each do |v|
                  if v.option1 == variant.option1 and v.option2 == variant.option2 and v.option3 == variant.option3
                    id = v.id
                    break
                  end
                end
                if id
                  puts "Found mathing id #{id}"
                  image = ShopifyAPI::Image.new
                  image.src = g_image.image.url
                  image.variant_ids = [id]
                  image.prefix_options[:product_id] = new_product.id
                  image.save
                  puts image.errors.inspect
                end
              end
            end
          else
            puts new_product.errors.inspect
          end
          # rescue

          # end
        end
      end
    end
  end

  def add_product_to_store
    p = params.permit :store_id, :product_id, :color_id
    store = Store.find_by_id p[:store_id]
    product = Product.find_by_id(p[:product_id])

    if product != nil
      store.add_product(product, p[:color_id])
    end
    pjson = []
    store.shopify_products.each do |pr|
      next if pr.product == nil
      pjson << {
        id: pr.id,
        image_url: pr.get_selected_color_image,
      }
    end
    render :json => {
      products: pjson,
    }
  end

  def remove_product_to_store
    p = params.permit :store_id, :product_id
    store = Store.find_by_id p[:store_id]
    product = ShopifyProduct.find_by_id(p[:product_id])
    puts "ldfkd"
    puts product.inspect
    if product != nil
      store.remove_product(product)
    end

    s = Shop.first
    if s and product.shopify_id != nil or product.shopify_id != ""
      s.with_shopify_session do
        begin
          spr = ShopifyAPI::Product.find(product.shopify_id.to_i)
          if spr
            spr.destroy
          end
        rescue => e
          puts e.inspect
        end
      end
    end

    pjson = []
    store.shopify_products.each do |pr|
      pjson << {
        id: pr.id,
        image_url: pr.get_selected_color_image,
      }
    end
    render :json => {
      products: pjson,
    }
  end

  def delete_logo_product
    p = params.permit :id
    begin
      s = ShopifyProduct.find p[:id]
      s.delete
    rescue
    end
  end

  def set_product_color
    p = params.permit :color_id, :product_id

    s = ShopifyProduct.find p[:product_id]
    s.set_selected_color ColorImage.find_by_id(p[:color_id])

    render :json => {
      image: s.get_selected_color.url,
    }
  end

  def set_product_logo
    p = params.permit :logo_id, :product_id
    s = ShopifyProduct.find p[:product_id]
    s.logo_id = p[:logo_id]
    s.save
    render :json => {
      product: s,
    }
  end

  def update_price_tag
    p = params.permit :price, :id
    sp = ShopifyProduct.find(p[:id])

    price_to_be = p[:price].to_f * 100.0
    dp = p[:price].to_f * 100.0
    sp.custom_base_price = dp
    s = sp.store
    if s.fundraising != nil and s.fundraising != 0
      price_to_be = dp * s.fundraising.to_f
      price_to_be = price_to_be / 100.0
      price_to_be = price_to_be + dp
      dp = price_to_be
    end
    sp.price = price_to_be
    sp.save
    render :json => {
      price: sp.price,
    }
  end

  def toggle_essential
    p = params.permit :id
    pro = ShopifyProduct.find_by_id p[:id]
    if !pro.essential
      pro.set_essential
    else
      pro.set_not_essential
    end
    pro.reload
    render :json => {
      :id => pro.id,
      :essential => pro.essential,
    }
  end

  def set_countdown
    p = params.permit :id, :time
    store = Store.find(p[:id])
    store.countdown = Time.at(p[:time].to_d)
    if store.save
      t = store.countdown - Time.now
      CloseStoreJob.set(wait: t).perform_later(store.id)
    end

    render :json => {
      countdown: store.countdown.to_i * 1000,
    }
  end

  private

  def check_unique_admin
  end

  def access_token_auth
    p = params.permit :id, :access_token
    @team_admin = TeamAdmin.find p[:id]
    if !@team_admin
      redirect_to all_stores_path
      return
    end

    if @team_admin.access_token.to_s != p[:access_token].to_s
      redirect_to all_stores_path
      return
    end
  end

  def define_vars
    @parent_link = "/a/locker/"
    @alerts = []
  end
end
