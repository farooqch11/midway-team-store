# frozen_string_literal: true
# Be sure to restart your server when you modify this file.

Rails.application.config.session_store(:cookie_store, key: "_example_session", expire_after: 14.days)
# Rails.application.config.session_store :cookie_store, {
#   :key => "_application_session",
#   :domain => :all,
#   :same_site => :none,
#   :secure => :true,
#   :tld_length => 2,
# }
