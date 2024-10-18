class SessionController < ApplicationController
    include ShopifyApp::AppProxyVerification
    before_action :define_vars

 
end
