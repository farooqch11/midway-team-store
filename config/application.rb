require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module App
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.2

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    # config.action_dispatch.default_headers = {
    #   'X-Frame-Options' => "headers 'p3p' => 'CP="Not used
    # }

    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '*'
        resource '/proxy_image', headers: :any, methods: [:get]
      end
    end

    config.action_dispatch.default_headers.delete("X-Frame-Options")
    config.action_dispatch.default_headers["P3P"] = 'CP=\"Not used\"'
  end
end
