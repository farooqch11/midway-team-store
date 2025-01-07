class StoreFrontController < ApplicationController
  include ShopifyApp::AppProxyVerification
  layout "store_layout"

  def index
    
    p = params.permit :collection_id, :p, :per_page, :filter, :category
    @store = Store.find_by_collection p[:collection_id]

    if @store == nil
      redirect_to store_front_find_path()
    end
    @filter_category = nil
    @filterstring = nil
    @active_filters = []
    @process_filters = {}
    if p.key? :filter
      filterarr = p[:filter].split ","
      filterarr.each do |k|
        j = k.split("_")
        @process_filters[j.first] = j.last
        @active_filters << j.last
      end
    end
    if p.key? :category
      @filter_category = p[:category]
    end

    if p[:p]
      page = p[:p]
    else
      page = 1
    end
    if p[:per_page]
      per_page = p[:per_page]
    else
      per_page = 12
    end

    if @store != nil
      @prods = @store.shopify_products.order(essential: :desc)
      @filtered_products = @prods
     
      if p.key? :category
        f = []
        @prods.each do |prr|
          puts "#{prr.product.category_ids.inspect} matching with --- #{p[:category].to_i} ---- #{prr.product.category_ids.include?(p[:category].to_i)} "
          if prr.product.category_ids.include? p[:category].to_i
            f << prr
          end
        end
        @filtered_products = f
      end

      if p.key? :filter and p[:filter] != ""
        f = []
        f_id = p[:filter].split("_").first
        f_val = p[:filter].split("_").last
        @prods.each do |prr|
          f << prr if prr.product.product_attrib_ids.include? f_val.to_i
        end

        @filtered_products = f
      end
      puts @filtered_products.inspect
      @filtered_products = @filtered_products.paginate(page: page, per_page: per_page)
      puts @filtered_products.inspect
      @handle = nil
      Shop.last.with_shopify_session do
        begin
          collection = ShopifyAPI::Collection.find(id: p[:collection_id])
          @handle = collection.handle
        rescue
        end
      end

      @cat_done = []
      @categories = []
      @attributes = {}
      @brands = []
      @store.shopify_products.each do |sp|
        next if sp.product == nil
        @brands << sp.product.vendor
        sp.product.categories.each do |cat|
          if !@cat_done.include?(cat.id)
            catt = {
              id: cat.id,
              title: cat.title,
              ids: [],
            }
            @store.shopify_products.each do |ssp|
              next if ssp.product == nil
              if ssp.product.categories.include? cat
                catt[:ids] << ssp.shopify_id
              end
            end

            @categories << catt
            @cat_done << cat.id
          end
        end

        sp.product.product_attribs.each do |pattrib|
          next if pattrib.attrib == nil
          next if pattrib.attrib.attrib_type == "color"
          pa = {
            title: pattrib.attrib.title,
            id: pattrib.attrib.id,
            values: {},
          }
          @attributes[pattrib.attrib.title] = pa if !@attributes.key?(pattrib.attrib.title)

          if !@attributes[pattrib.attrib.title][:values].key? pattrib.title
            @attributes[pattrib.attrib.title][:values][pattrib.title] = {
              id: pattrib.id,
              title: pattrib.title,
              ids: [],
            }
          end
          iids = @attributes[pattrib.attrib.title][:values][pattrib.title][:ids]
          if !iids.include? sp.shopify_id
            @attributes[pattrib.attrib.title][:values][pattrib.title][:ids] << sp.shopify_id
          end
        end
      end
      @brands = @brands.uniq!
    end

    render(content_type: "application/liquid")
  end

  def search
    p = params.permit :q
    stores = Store.where("title LIKE ?", "%#{p[:q]}%")
    res = []
    stores.each do |store|
      if store.is_published?
        res << {
          id: store.id,
          link: store_front_index_path(:collection_id => store.collection),
          title: store.title,
          logo: store.get_first_logo,
        }
      end
    end
    render :json => res
  end

  def find
    render(content_type: "application/liquid")
  end
end
