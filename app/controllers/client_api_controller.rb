class ClientApiController < ApplicationController
  include ShopifyApp::AppProxyVerification

  def get_products
    puts "*********filtering products********* "
    p = params.permit(:page, :per_page, :filters => {})
    puts "request came in page #{p[:page] if p.key?(:page)}"
    filterData = p[:filters]
    products = []
    tproducts = []

    if filterData != nil
      if filterData.key? :category
        products = Product.includes(:categories, :product_attribs).not_custom.where(:categories => { id: filterData[:category] })
      else
        puts "no category, selecting all products"
        products = Product.includes(:categories, :product_attribs).not_custom
        # tproducts = Product.all.includes(:categories, :product_attribs).not_custom
      end

      puts "selected #{products.size} products to filter"
      puts filterData.inspect

      if filterData.key? :attributes
        color_ids = []
        titles = []
        first = true
        products_to_filter = products
        filterData[:attributes].each do |handle, data|
          puts "filteirng by #{handle}"
          at = Attrib.find_by_handle handle
          tresults = []

          # products_to_filter = tproducts
          if first
            products_to_filter = products
            first = false
          end

          puts "products to filter from: #{products_to_filter.size}"

          products_to_filter.each do |product|
            data.each do |val|
              # puts "Attribute Type: #{at.attrib_type}"
              puts "search for #{val}"

              if at.attrib_type == "color"
                att = product.product_attribs.where(attrib_id: at.id, color_id: val)
              else
                att = product.product_attribs.where(attrib_id: at.id, title: val)
              end
              # puts "Attribs found #{att.count}"
              # puts "."
              # puts "."
              puts "Found #{att.count}"
              if att.count > 0
                tresults << product if !tresults.include? product
                break
              end
            end
          end

          tproducts = tresults
          products_to_filter = tproducts
        end
      else
        # tproducts = Product.includes(:categories).where(:categories => { id: filterData[:category] })
        tproducts = products
      end

      puts "after filtering #{tproducts.size} products"
    else
      tproducts = Product.all.includes(:categories, :product_attribs).not_custom
      puts "no filter #{tproducts.size} products selected"
    end

    puts "filtering #{tproducts.size} products selected noiw with params"
    products = tproducts
    filtered_products = tproducts
    # tproducts.each do |product|
    #   puts "#{product.title}: #{product.logo_param.nil?}"
    #   filtered_products << product if product.logo_param != nil
    # end
    # filtered_products = tproducts.collect { |x| x if !x.logo_param.nil? }.compact

    puts "after chcking params: #{filtered_products.size} products selected"

    if filterData != nil and filterData.key? :vendor
      puts filterData[:vendor].inspect
      fprods = filtered_products
      vprods = []
      fprods.each do |product|
        puts "#{product.vendor} - #{product.title} -- #{filterData[:vendor].include?(product.vendor)}"
        vprods << product if filterData[:vendor].include?(product.vendor)
      end
      filtered_products = vprods
    end
    puts "#{filtered_products.size} products finalbefore logo param"
    products = filtered_products.map do |product|
      product.as_json(include: [:logo_param, :categories, :color_images => { only: [:id, :color_code] }])
    end
    products = products.compact
    puts "#{products.size} products final"

    if p[:page]
      page = p[:page]
    else
      page = 1
    end
    if p[:per_page]
      per_page = p[:per_page]
    else
      per_page = 12
    end

    # products = products.paginate(page: 1, per_page: 15)
    pprods = products
    # products = WillPaginate::Collection.create(page, per_page, pprods.size) do |pager|
    #   pager.replace pprods[pager.offset, pager.per_page]
    # end
    products = Kaminari.paginate_array(products).page(page).per(per_page)
    puts products.inspect
    puts "Product entries: #{products.total_count}"

    total_pages = (products.total_count / per_page).ceil
    render :json => {
      total_pages: products.total_pages,
      current_page: products.current_page,
      products: products,
    }
  end
end
