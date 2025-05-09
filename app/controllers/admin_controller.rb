class AdminController < AuthenticatedController
  include Rails.application.routes.url_helpers

  skip_before_action :verify_authenticity_token
  

  def index
    # @products = ShopifyAPI::Product.find(:all, params: { limit: 10 })
    @products = ShopifyAPI::Product.all(limit: 10)
    # @webhooks = ShopifyAPI::Webhook.find(:all)
  end

  def orders
    @stores = Store.paginate(page: params[:p] || 1, per_page: 5)
  end

  def products
    @products = Product.not_custom.includes(:logo_param, :categories)
  
    if params[:search].present?
      query = "%#{params[:search]}%"
      @products = @products.where("title ILIKE :q OR tags ILIKE :q", q: query)
    end
    puts request.headers["Accept"]
    puts request.xhr?

    debugger
    respond_to do |format|
      format.html # normal page load
      format.js   { render partial: "admin/products_table", locals: { products: @products } }
    end
  end  
  
  def custom_products
    @products = []
    @attributes = Attrib.all

    p = params.permit :search
    if p.key? :search
      @products = Product.custom.where("tags like ? OR title LIKE ?", "%#{p[:search]}%", "%#{p[:search]}%")
    else
      @products = Product.all.custom
    end
    puts @products.inspect
  end

  # attributes actions
  def attributes
    @attribs = Attrib.all
    @new_attrib = Attrib.new
  end

  def attributes_new
    p = params.permit(:attrib => {})
    info = p[:attrib]
    handle = info[:title].to_s.parameterize
    puts handle.inspect

    a = Attrib.find_by_handle handle
    if a == nil
      a = Attrib.new
      a.attrib_type = info[:attrib_type]
      a.title = info[:title]
      a.handle = handle
      a.save
    else
      @error = "Attribute with name #{info[:title]} already exists"
    end

    @attribs = Attrib.all
    @new_attrib = Attrib.new

    render "admin/attributes"
  end

  def attributes_update
    p = params.permit(:id, :attrib => {})
    info = p[:attrib]

    a = Attrib.find(p[:id])
    if a.title != info[:title]
      handle = info[:title].to_s.parameterize

      if !Attrib.find_by_handle handle
        a.title = info[:title]
        a.handle = handle
        a.save
      else
        @error = "Attribute with name #{info[:title]} already exists"
      end
    end
    @attribs = Attrib.all
    @new_attrib = Attrib.new

    render "admin/attributes"
  end

  def attributes_delete
    p = params.permit(:id)
    a = Attrib.find(p[:id])
    a.delete
    redirect_to action: "attributes"
  end

  def attributes_add_to_product
    p = params.permit(:attrib_id, :product_id, :value)
    a = Attrib.find(p[:attrib_id])
    product = Product.find(p[:product_id])

    product.add_attribute(a, p[:value])

    attrs = []
    product.product_attribs.each do |p|
      attrs << p
    end
    render :json => product.get_attributes(a)
  end

  def attributes_remove_from_product
    p = params.permit(:attrib_id, :product_id, :value)
    a = Attrib.find(p[:attrib_id])
    product = Product.find(p[:product_id])

    product.remove_attribute(a, p[:value])

    render :json => product.get_attributes(a)
  end

  #payouts
  def payouts
    @payouts = Payout.all.order(:created_at).reverse_order
  end

  # stores
  def stores
    @stores = Store.all
  end

  def stores_delete
    p = params.permit :id
    begin
      store = Store.find(p[:id])
      store.delete
    rescue
    end
    redirect_to admin_stores_path
  end

  def stores_orders
    p = params.permit :id
    @store = nil
    begin
      @store = Store.find(p[:id])
    rescue
      redirect_to admin_stores_path
    end
  end

  def stores_payouts
    p = params.permit :id
    @store = nil
    begin
      @store = Store.find(p[:id])
    rescue
      redirect_to admin_stores_path
    end
  end

  def stores_payout_set_tracking
    p = params.permit :pid, :tracking
    payout = Payout.find p[:pid]
    payout.tracking = p[:tracking]
    payout.save
    redirect_to admin_stores_payouts_path(:id => payout.store.id)
  end

  def stores_logos
    p = params.permit :id
    @store = nil
    begin
      @store = Store.find(p[:id])
    rescue
      redirect_to admin_stores_path
    end
  end

  def store_logo_upload
    p = params.permit :id, :xs_logo
    store = nil
    begin
      store = Store.find(p[:id])
    rescue
      redirect_to admin_stores_path
    end

    logo = Logo.new
    logo.store = store
    logo.logo_file.attach p[:xs_logo]
    logo.save

    store.save

    redirect_to admin_stores_logos_path(:id => store.id)
  end

  def store_logo_delete
    p = params.permit :id, :logo_id
    store = nil
    begin
      store = Store.find(p[:id])
    rescue
      redirect_to admin_stores_path
    end

    logo = store.logos.find(p[:logo_id])
    logo.delete

    redirect_to admin_stores_logos_path(:id => store.id)
  end

  def stores_payout_set_paid
    p = params.permit :pid
    payout = Payout.find p[:pid]
    payout.set_status :paid
    redirect_to admin_stores_payouts_path(:id => payout.store.id)
  end

  def logo_requests
    @logo_requests = LogoRequest.all
  end

  # team_admins
  def team_admins
    @team_admins = TeamAdmin.all
  end

  def team_admins_delete
    p = params.permit :id
    begin
      admin = TeamAdmin.find(p[:id])
      admin.delete
    rescue
    end
    redirect_to admin_team_admins_path
  end

  def team_admins_orders
    p = params.permit :id
    begin
      @admin = TeamAdmin.find(p[:id])
    rescue
      redirect_to admin_team_admins_path
    end
  end

  def team_admins_details
    p = params.permit :id
    begin
      @admin = TeamAdmin.find(p[:id])
    rescue
      redirect_to admin_team_admins_path
    end
  end

  def team_admin_store_generate_link
    p = params.permit :id
    team_admin = nil
    begin
      team_admin = TeamAdmin.find p[:id]
    rescue
      team_admin = false
    end
    res = {}
    if team_admin
      if team_admin.stores.size > 0
        store = team_admin.stores.first
      else
        store = Store.new
        store.title = "New Store"
        store.team_admin = team_admin
        store.save
      end
      store.regenerate_admin_token
      link = "https://" + Shop.last.shopify_domain + store_setup_path(store.id) + "?uuit=#{store.admin_token}"
      res = {
        link: link,
      }
    end
    render :json => res
  end

  # colors actions
  def colors
    @colors = Color.all
    @new_color = Color.new
  end

  def colors_new
    p = params.permit(:color => {})
    info = p[:color]
    color_code = info[:code]

    a = Color.find_by_code color_code
    if a == nil and !info[:title].empty? and !info[:code].empty?
      a = Color.new
      a.code = info[:code]
      a.title = info[:title]
      a.save
    else
      @error = "Color with code #{info[:code]} already exists"
    end

    @error = "Title and color code can't be empty" if info[:title].empty? or info[:code].empty?

    @colors = Color.all
    @new_color = Color.new

    render "admin/colors"
  end

  def colors_update
    p = params.permit(:id, :color => {})
    info = p[:color]

    a = Color.find(p[:id])
    if !info[:title].empty? and !info[:code].empty?
      code = info[:code]

      by_code = Color.find_by_code code
      if !by_code
        a.title = info[:title]
        a.code = code
        a.save
        @success = "Color updated."
      else
        @error = "Color with code #{info[:code]} with name #{by_code.title} already exists"
      end
    end

    @error = "Title and color code can't be empty" if info[:title].empty? or info[:code].empty?
    @colors = Color.all
    @new_color = Color.new

    render "admin/colors"
  end

  def colors_delete
    p = params.permit(:id)
    a = Color.find(p[:id])
    a.delete
    redirect_to action: "colors"
  end

  #categories actions
  def categories
    @new_category = Category.new
  end

  def categories_new
    category_params = params.require(:category).permit(:title, :image)
    category = Category.new(category_params)
  
    if category.save
      render json: { success: true, category: category }
    else
      render json: { success: false, errors: category.errors.full_messages }, status: :unprocessable_entity
    end
  end
  

  def categories_edit
    p = params.permit(:id, :category => {})
    data = p[:category]
    c = Category.find(p[:id])
    c.title = data[:title]
    if data.key?(:image)
      c.image.purge
      c.image.attach(data[:image])
    end
    c.save
    redirect_to action: "categories"
  end

  def categories_delete
    p = params.permit(:id)
    c = Category.find_by_id(p[:id])
    if c
      c.destroy
    end
    redirect_to action: "categories"
  end

  def fetch_products_from_shopify
    ProductsFetchJob.new.perform  # run only once
  end

  def fetch_custom_products_from_shopify
    ProductsFetchJob.perform_later
    # custom_product_vendor = "xs_custom"
    # @pros = []
    # s_products = ShopifyAPI::Product.find(:all, params: { limit: 50 })

    # @pros = @pros + s_products
    # sleep(1)
    # i = 0
    # while s_products.next_page?
    #   s_products = s_products.fetch_next_page
    #   # puts s_products.inspect
    #   @pros = @pros + s_products
    #   sleep(1)
    #   puts "Request done"
    # end

    # @pros.each do |product|
    #   next if product.product_type == "[xs]"
    #   next if !product.tags.include? "custom team store"

    #   p = Product.find_by_product_id product.id
    #   if !p
    #     p = Product.new
    #     p.product_id = product.id
    #     p.title = product.title
    #     p.handle = product.handle
    #     p.price = product.variants.first.price.to_f * 100
    #     p.description = product.body_html
    #     p.tags = product.tags
    #     p.published = false
    #     if product.images.size > 0
    #       p.image_url = product.images.first.src
    #       p.save
    #     end
    #   end

    #   p.price = product.variants.first.price.to_f * 100
    #   p.save
    #   puts product.variants.first.price
    #   colorIndex = nil
    #   i = 1
    #   product.options.each do |option|
    #     o = option.name.downcase
    #     if o == "color" or o == "colour"
    #       colorIndex = i
    #       break
    #     end
    #     i = i + 1
    #   end

    #   p.color_images.each do |c|
    #     c.delete
    #   end
    #   if colorIndex != nil
    #     puts "Color Index #{colorIndex}"
    #     product.variants.each do |variant|
    #       propname = "option#{colorIndex}"
    #       puts variant.send(propname)
    #       color = variant.send(propname)

    #       # saving the color
    #       c = Color.find_by_title color
    #       if !c
    #         c = Color.new
    #         c.title = color
    #         c.code = "#000000"
    #         c.save
    #       end
    #       attrib = Attrib.find_by_title "Color"
    #       if attrib
    #         pa = ProductAttrib.new
    #         pa.product = p
    #         pa.color = c
    #         pa.attrib = attrib
    #         pa.save
    #       end

    #       color_image = p.color_images.find_by_color color

    #       puts "Color image"
    #       puts color_image.inspect
    #       if !color_image
    #         if variant.image_id != nil
    #           variantImage = ShopifyAPI::Image.find(variant.image_id, :params => { :product_id => p.product_id })
    #           sleep 0.7
    #           color_image = ColorImage.new
    #           color_image.product = p
    #           color_image.color = color
    #           color_image.url = variantImage.src
    #           color_image.save
    #         end
    #       end
    #     end
    #   else
    #     dc = Color.find_by_title "Default"
    #     if !dc
    #       dc = Color.new
    #       dc.title = "Default"
    #       dc.code = "#fff"
    #       dc.save
    #     end

    #     if product.images.size > 0
    #       color_image = ColorImage.new
    #       color_image.product = p
    #       color_image.color = dc
    #       color_image.url = product.images.first.src
    #       color_image.save
    #     end
    #   end
    #   p.custom_product = true
    #   p.save
    # end
  end

  def fetch_search_products
    p = params.permit :query
    puts p.inspect
    prs = Product.where("title LIKE ?", "%" + p[:query] + "%")
    products = []
    prs.each do |pr|
      products << {
        id: pr.id,
        title: pr.title,
        image_url: pr.image_url,
      }
    end

    @results = {
      products: products,
    }
    render :json => @results
  end

  def fetch_search_products_not_in_cat
    p = params.permit :query, :category_id
    puts p.inspect
    cat = Category.find p[:category_id]
    prs = Product.where("title LIKE ?", "%" + p[:query] + "%")
    products = []
    prs.each do |pr|
      puts pr.category_ids.inspect
      if !pr.categories.include? cat
        products << {
          id: pr.id,
          title: pr.title,
          image_url: pr.image_url,
        }
      end
    end

    @results = {
      products: products,
    }
    puts @results.inspect
    render :json => @results
  end

  def add_product_to_cat
    p = params.permit :category_id, :product_id
    cat = Category.find(p[:category_id])
    pr = Product.find(p[:product_id])
    if !cat.products.include? pr
      cat.products << pr
    end
    cat.save

    products = []
    cat.products.each do |product|
      products << {
        id: product.id,
        title: product.title,
        image_url: product.image_url,
      }
    end

    render_category_info(cat)
  end

  def remove_product_from_cat
    p = params.permit :category_id, :product_id
    cat = Category.find(p[:category_id])
    pr = Product.find(p[:product_id])
    if cat.products.include? pr
      cat.products.delete(pr)
    end
    cat.save

    render_category_info(cat)
  end

  def fetch_search_categories
    p = params.permit :query
    puts p.inspect
    categories = Category.where("title LIKE ?", "%" + p[:query] + "%")
    cats = []
    categories.each do |cat|
      image = nil
      image = rails_blob_path(cat.image, disposition: "attachment") if cat.image.attached?
      cats << {
        id: cat.id,
        title: cat.title,
        image_url: image,
      }
    end

    @results = {
      categories: cats,
    }
    puts @results.inspect
    render :json => @results
  end

  def fetch_search_stores
    p = params.permit :query
    puts p.inspect
    stores = Store.where("title LIKE ?", "%" + p[:query] + "%")
    storesJson = []
    stores.each do |cat|
      image = nil
      storesJson << {
        id: cat.id,
        title: cat.title,
        image_url: image,
      }
    end

    @results = {
      stores: storesJson,
    }
    puts @results.inspect
    render :json => @results
  end

  def add_cat_to_product
    p = params.permit :category_id, :product_id
    cat = Category.find(p[:category_id])
    pro = Product.find(p[:product_id])
    puts pro.inspect
    if !pro.categories.include? cat
      pro.categories << cat
    end
    pro.save

    render_product_info(pro)
  end

  def add_store_to_product
    p = params.permit :store_id, :product_id
    store = Store.find(p[:store_id])
    pro = Product.find(p[:product_id])
    if !pro.stores.include? store
      store.add_product(pro, pro.color_images.first.id)
    end

    render_product_info(pro)
  end

  def remove_cat_from_product
    p = params.permit :category_id, :product_id
    cat = Category.find(p[:category_id])
    pr = Product.find(p[:product_id])
    if pr.categories.include? cat
      pr.categories.delete(cat)
    end
    pr.save

    render_product_info(pr)
  end

  def remove_store_from_product
    p = params.permit :store_id, :product_id
    store = Store.find(p[:store_id])
    pro = Product.find(p[:product_id])
    if pro.stores.include? store
      store.remove_product(pro)
    end

    render_product_info(pro)
  end

  def add_all_to_category
    p = params.permit :category_id, :ids => []
    cat = Category.find(p[:category_id])

    p[:ids].each do |pid|
      pr = Product.find_by_id pid
      if pr
        if !pr.categories.include? cat
          pr.categories << cat
          pr.save
        end
      end
    end
    render_products_info(p[:ids])
  end

  def remove_all_from_category
    p = params.permit :category_id, :ids => []
    cat = Category.find(p[:category_id])

    p[:ids].each do |pid|
      pr = Product.find_by_id pid
      if pr
        if pr.categories.include? cat
          pr.categories.delete(cat)
          pr.save
        end
      end
    end
    render_products_info(p[:ids])
  end

  def publish_bulk
    p = params.permit :ids => []

    p[:ids].each do |pid|
      pr = Product.find_by_id pid
      if pr
        pr.publish
      end
    end

    render_products_info(p[:ids])
  end

  def unpublish_bulk
    p = params.permit :ids => []

    p[:ids].each do |pid|
      pr = Product.find_by_id pid
      if pr
        pr.unpublish
      end
    end

    render_products_info(p[:ids])
  end

  def product_delete
    p = params.permit :id
    pid = p[:id]
    pr = Product.find_by_id pid
    if pr
      pr.destroy
    end

    render :json => { status: 200 }
  end

  def product_bulk_delete
    p = params.permit :ids => []

    p[:ids].each do |pid|
      pr = Product.find_by_id pid
      if pr
        pr.destroy
      end
    end

    render :json => {
      status: 200,
    }
  end

  #product api routes
  def publish_product
    p = params.permit :product_id
    product = Product.find(p[:product_id])

    product.publish
    render_product_info(product)
  end

  def unpublish_product
    p = params.permit :product_id
    product = Product.find(p[:product_id])

    product.unpublish
    render_product_info(product)
  end

  def toggle_publish_product
    p = params.permit :product_id
    product = Product.find(p[:product_id])

    product.toggle_publish
    render_product_info(product)
  end

  # logo params definition
  def fetch_logo_params
    p = params.permit :product_id
    product = Product.find(p[:product_id])
    found = true
    found = false if product.logo_param == nil
    render :json => {
      found: found,
      logo_params: product.logo_param,
    }
  end

  def save_logo_params
    p = params.permit :product_id, :info => {}
    product = Product.find(p[:product_id])
    logo_p = product.logo_param
    logo_p = LogoParam.new if logo_p == nil
    logo_p.product = product
    info = p[:info]
    logo_p.pos_x = info[:pos_x]
    logo_p.pos_y = info[:pos_y]
    logo_p.width = info[:width]
    logo_p.height = info[:height]
    logo_p.save

    render :json => {
      found: true,
      logo_params: logo_p,
    }
  end

  # helper functions
  def render_category_info(category)
    products = []
    category.products.each do |product|
      products << {
        id: product.id,
        title: product.title,
        image_url: product.image_url,
      }
    end

    render :json => {
      id: category.id,
      products_count: category.products.size,
      products: products,
    }
  end

  def render_product_info(product)
    product_info = {
      id: product.id,
      title: product.title,
      published: product.published,
      categories_count: product.categories.count,
      stores_count: product.stores.count,
      categories: [],
      stores: [],
    }
    product.categories.each do |category|
      product_info[:categories] << {
        id: category.id,
        title: category.title,
        image_url: category.image.attached? ? rails_blob_path(category.image, disposition: "attachment") : nil,
      }
    end
    product.stores.each do |store|
      product_info[:stores] << {
        id: store.id,
        title: store.title,
      }
    end

    render :json => product_info
  end

  def render_products_info(ids)
    info = []
    ids.each do |id|
      product = Product.find_by_id id
      if product
        product_info = {
          id: product.id,
          title: product.title,
          published: product.published,
          categories_count: product.categories.count,
          stores_count: product.stores.count,
          categories: [],
          stores: [],
        }
        product.categories.each do |category|
          product_info[:categories] << {
            id: category.id,
            title: category.title,
            image_url: category.image.attached? ? rails_blob_path(category.image, disposition: "attachment") : nil,
          }
        end
        product.stores.each do |store|
          product_info[:stores] << {
            id: store.id,
            title: store.title,
          }
        end
        info << product_info
      end
    end

    render :json => info
  end

  def all_tags
    @titles = []
    ProductAttrib.all.each do |a|
      next if a.attrib.nil?
      if a.attrib.attrib_type == "text"
        unless @titles.include?(a.title)
          @titles << a.title
        end
      end
    end
  end

  def all_tags_delete
    p = params.permit :title
    ProductAttrib.all.each do |a|
      next if a.attrib.nil?
      if a.attrib.attrib_type == "text"
        if a.title == p[:title]
          a.delete
        end
      end
    end
    redirect_to admin_all_tags_path
  end
end
