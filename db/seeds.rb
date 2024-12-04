# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# CLEAN DATABASE
# Product.delete_all
# Attrib.delete_all
# ProductAttrib.delete_all

# ShopifyProduct.delete_all

# Color.delete_all
# ColorImage.delete_all

# Order.delete_all
# OrderItem.delete_all

# Store.delete_all
# Logo.delete_all
# LogoParam.delete_all
# LogoRequest.delete_all

# TeamAdmin.delete_all
Product.find_each do |product|
    logo_param = product.logo_param || LogoParam.new
    logo_param.product = product
    logo_param.pos_x = 281
    logo_param.pos_y = 104
    logo_param.width = 100
    logo_param.height = 50
  
    if logo_param.save
      puts "LogoParam saved for Product ID #{product.id}"
    else
      puts "Failed to save LogoParam for Product ID #{product.id}: #{logo_param.errors.full_messages.join(", ")}"
    end
  end