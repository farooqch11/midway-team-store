class AccountController < ApplicationController
    include ShopifyApp::AppProxyVerification
    layout "client"
    before_action :define_vars, :auth?

    def settings
        
        

        render(content_type: "application/liquid")
    end
    def save_payment_info
        p = params.permit :admin_info => {}
        info = p[:admin_info]
        @admin_info.address1 = info[:address1]
        @admin_info.address2 = info[:address2]
        @admin_info.city = info[:city]
        @admin_info.country = info[:country]
        @admin_info.state = info[:state]
        @admin_info.full_name = info[:full_name]
        @admin_info.zipcode = info[:zipcode]
        @admin_info.save
        redirect_to account_settings_path(:access_token => @team_admin.access_token, :id => @team_admin.id, :success_text => "Payment Info Changed")
    end
    def save_general_info
        p = params.permit :team_admin => {}
        info = p[:team_admin]
        if info[:email] != @team_admin.email
            if !TeamAdmin.find_by_email info[:email]
                @team_admin.email = info[:email]
                @team_admin.save
            end
        end
        redirect_to account_settings_path(:access_token => @team_admin.access_token, :id => @team_admin.id, :success_text => "Email Changed")
    end


    private

    def auth? 
        p = params.permit :id, :access_token
        @team_admin = TeamAdmin.find p[:id]
        if !@team_admin
            redirect_to all_stores_path
            return
        end

        if @team_admin.access_token.to_s != p[:access_token].to_s
            redirect_to all_stores_path
            return
        end

        @admin_info = @team_admin.admin_info

        if @admin_info == nil
            @admin_info = AdminInfo.new
            @admin_info.team_admin = @team_admin
            @admin_info.save
        end
    end
    def define_vars
        @parent_link = "/a/locker/"
        @alerts = []

        if params.include? :success_text
            @alerts <<  {
                :type => "success",
                :text => params.permit(:success_text)[:success_text]
            }
        end
    end
end
