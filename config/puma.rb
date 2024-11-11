max_threads_count = ENV.fetch("RAILS_MAX_THREADS") { 5 }
min_threads_count = ENV.fetch("RAILS_MIN_THREADS") { max_threads_count }
threads min_threads_count, max_threads_count

# Specifies the `port` that Puma will listen on to receive requests; default is 3000.
port ENV.fetch("PORT") { 3000 }

# Set environment based on ENV, default to production
rails_env = ENV.fetch("RAILS_ENV") { "production" }
environment rails_env

# Specifies the number of `workers` to boot in clustered mode.
# workers ENV.fetch("WEB_CONCURRENCY") { 2 }

# Preload app for better performance in clustered mode
preload_app!

# Set up socket location if needed
app_dir = File.expand_path("../..", __FILE__)
shared_dir = "#{app_dir}/shared"
# Commenting out bind for simplicity; use port above for local dev
# bind "unix://#{shared_dir}/sockets/puma.sock"

# Commenting out `stdout_redirect` to log directly to terminal
# stdout_redirect "#{shared_dir}/log/puma.stdout.log", "#{shared_dir}/log/puma.stderr.log", true

# Set master PID and state locations
pidfile "#{shared_dir}/pids/puma.pid"
state_path "#{shared_dir}/pids/puma.state"
activate_control_app

on_worker_boot do
  # require "active_record"
  # ActiveRecord::Base.connection.disconnect! rescue ActiveRecord::ConnectionNotEstablished
  # ActiveRecord::Base.establish_connection(YAML.load_file("#{app_dir}/config/database.yml")[rails_env])
  require "active_record"
  ActiveRecord::Base.connection.disconnect! rescue ActiveRecord::ConnectionNotEstablished

  # Load database configuration with YAML aliases enabled
  config = YAML.load_file("#{app_dir}/config/database.yml", aliases: true)
  ActiveRecord::Base.establish_connection(config[rails_env])
end

# Allow Puma to be restarted by `rails restart` command.
plugin :tmp_restart
