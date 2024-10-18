# SecureHeaders::Configuration.default do |config|
#   config.cookies = {
#     samesite: {
#       none: true,
#     },
#     secure: true, # mark all cookies as Secure
#     httponly: SecureHeaders::OPT_OUT, # do not mark any cookies as HttpOnly
#   }

#   config.csp = SecureHeaders::OPT_OUT
#   config.hsts = SecureHeaders::OPT_OUT
#   config.x_frame_options = SecureHeaders::OPT_OUT
#   config.x_content_type_options = SecureHeaders::OPT_OUT
#   config.x_xss_protection = SecureHeaders::OPT_OUT
#   config.x_permitted_cross_domain_policies = SecureHeaders::OPT_OUT
# end
