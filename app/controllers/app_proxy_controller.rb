# frozen_string_literal: true
class AppProxyController < ApplicationController
  include ShopifyApp::AppProxyVerification

  def index
    render(content_type: "application/liquid")
  end
  def test
    render(content_type: "application/liquid")
  end
end
