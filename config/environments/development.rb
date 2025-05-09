Rails.application.configure do
  # Allow ngrok tunnels for secure Shopify OAuth redirects
  config.hosts = (config.hosts rescue []) << /[-\w]+\.ngrok\.io/
  config.hosts = (config.hosts rescue []) << /[-\w]+\.ngrok-free\.io/
  config.hosts = (config.hosts rescue []) << /.*\.ngrok\.io/
  config.hosts = (config.hosts rescue []) << /.*\.ngrok-free\.app/
  # Allow Cloudflare tunnels for secure Shopify OAuth redirects
  config.hosts = (config.hosts rescue []) << /[-\w]+\.trycloudflare\.com/
  # Settings specified here will take precedence over those in config/application.rb.
  config.hosts = (config.hosts rescue []) << /.*\.myshopify\.com/
  config.hosts = (config.hosts rescue []) << /.*\.midwayteamstore\.com/
  config.hosts = (config.hosts rescue []) << /.*\.midwayys.myshopify\.com/
  config.hosts << "midwayys.myshopify.com"
  config.hosts << "https://stat-favorites-cult-detector.trycloudflare.com"
  config.hosts.clear



  # In the development environment your application's code is reloaded on
  # every request. This slows down response time but is perfect for development
  # since you don't have to restart the web server when you make code changes.
  config.cache_classes = false

  # Do not eager load code on boot.
  config.eager_load = false

  # Show full error reports.
  config.consider_all_requests_local = true

  # Enable/disable caching. By default caching is disabled.
  # Run rails dev:cache to toggle caching.
  if Rails.root.join("tmp", "caching-dev.txt").exist?
    config.action_controller.perform_caching = true

    config.cache_store = :memory_store
    config.public_file_server.headers = {
      "Cache-Control" => "public, max-age=#{2.days.to_i}",
    }
  else
    config.action_controller.perform_caching = false

    config.cache_store = :null_store
  end

  # Store uploaded files on the local file system (see config/storage.yml for options)
  config.active_storage.service = :amazon

  # Don't care if the mailer can't send.
  config.action_mailer.raise_delivery_errors = false

  config.action_mailer.perform_caching = false

  # Print deprecation notices to the Rails logger.
  config.active_support.deprecation = :log

  # Raise an error on page load if there are pending migrations.
  config.active_record.migration_error = :page_load

  # Highlight code that triggered database queries in logs.
  config.active_record.verbose_query_logs = true

  # Debug mode disables concatenation and preprocessing of assets.
  # This option may cause significant delays in view rendering with a large
  # number of complex assets.
  config.assets.debug = true
  config.logger = Logger.new(STDOUT)


  # Suppress logger output for asset requests.
  config.assets.quiet = true

  # Raises error for missing translations
  # config.action_view.raise_on_missing_translations = true
  # config.hosts << "https://6f13-39-58-110-214.ngrok-free.app"
  # Use an evented file watcher to asynchronously detect changes in source code,
  # routes, locales, etc. This feature depends on the listen gem.
  # config.file_watcher = ActiveSupport::EventedFileUpdateChecker
  config.action_controller.asset_host = ENV['HOST']
  config.action_mailer.default_url_options = { host: "https://shining-hound-ready.ngrok-free.app/", protocol: "https" }
  config.action_controller.default_url_options = {:host => "https://shining-hound-ready.ngrok-free.app"}
  # config.routes.default_url_options[:host] = 'https://shining-hound-ready.ngrok-free.app'
  # Rails.application.routes.default_url_options[:host] = "shining-hound-ready.ngrok-free.app"
  # Rails.application.config.hosts << "midwayteamstore.com"
  Rails.application.routes.default_url_options[:host] = "https://shining-hound-ready.ngrok-free.app"
  # Rails.application.action_controller.default_url_options[:host] = "https://shining-hound-ready.ngrok-free.app"

  
  Rails.application.config.asset_host = ENV['HOST']



  config.sass.inline_source_maps = true
end