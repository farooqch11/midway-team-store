source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "3.2.5"

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem "rails", "~> 7.2.1", ">= 7.2.1.1"
# Use sqlite3 as the database for Active Record
# gem 'sqlite3'
gem "mysql2"
# Use Puma as the app server
gem "puma", ">= 5.0"
# Use SCSS for stylesheets
gem "sass-rails", "~> 5.0"
# gem 'sass-rails', '>= 6'
# Use Uglifier as compressor for JavaScript assets
gem "uglifier", ">= 1.3.0"
# See https://github.com/rails/execjs#readme for more supported runtimes
gem "duktape"
# Use CoffeeScript for .coffee assets and views
gem "coffee-rails", "~> 4.2"
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem "turbolinks", "~> 5"
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem "jbuilder", "~> 2.5"
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use ActiveModel has_secure_password
gem "bcrypt", "~> 3.1.11"
gem "dotenv"
# Use ActiveStorage variant
# gem 'mini_magick', '~> 4.8'
# gem 'sassc', '~> 2.1.0'
# gem 'sassc', '>= 2.4.0'
# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development
# gem 'sassc', '~> 2.1.0'


# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", ">= 1.1.0", require: false

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem "byebug", platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem "web-console", ">= 3.3.0"
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  gem "capybara", ">= 2.15"
  gem "selenium-webdriver"
  # Easy installation and use of chromedriver to run system tests with Chrome
  gem "chromedriver-helper"
end

group :production do
  gem 'pg'
  gem 'rails_12factor'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# gem "shopify_app", "~> 14.4.4"
gem 'shopify_app', '~> 22.4'
# gem "font-awesome-sass", "~> 5.13.0"
gem "selectize-rails"
gem "rack-cors"
gem "carrierwave", "~> 2.0"
gem "carrierwave-base64"
gem "sidekiq"
gem "groupdate"
gem "rails_same_site_cookie"
gem "aws-sdk"
gem 'will_paginate', '~> 4.0'

gem "kaminari"
