class ImagesController < ApplicationController
    require 'open-uri'
  
    def proxy
      image_url = params[:url]
      file = URI.open(image_url)
      send_data file.read, type: file.content_type, disposition: 'inline'
    end
  end