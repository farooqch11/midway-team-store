class ClientController < ApplicationController
  include ShopifyApp::AppProxyVerification

  layout "client"
  before_action :define_vars
  # before_action :logged_in?, :except => [:login, :signup]
  # before_action :current_admin

  def getstarted
    @user_auth_process = false
    @get_started_process = true
    @categories = Category.all
    @attributes = Attrib.limit 50
    render(content_type: "application/liquid")
  end

  def signup
    @user_auth_process = true
    p = params.permit :xs_redirect, :team_admin => {}
    @team_admin = TeamAdmin.new

    if p.key? :team_admin
      data = p[:team_admin]
      res = {}
      if data[:email].empty? or data[:password].empty?
        res = {
          :status => "signup_error",
          :text => "Email/Password is required",
        }
      else
        @team_admin.email = data[:email]

        if TeamAdmin.find_by_email data[:email]
          res = {
            :status => "signup_error",
            :text => "Email is already registered with another account",
          }
        else
          @team_admin.first_name = data[:first_name]
          @team_admin.last_name = data[:last_name]
          @team_admin.phone = data[:phone]
          @team_admin.organization = data[:organization]
          @team_admin.team_number = data[:team_number]
          @team_admin.team_type = data[:team_type]
          @team_admin.role = data[:role]
          @team_admin.organization_name = data[:organization_name]

          if data[:sports].kind_of?(Array)
            @team_admin.sports = data[:sports].join ","
          else
            @team_admin.sports = data[:sports].to_s
          end
          if data[:solution] != nil
            @team_admin.solution = data[:solution].join ","
          else
            @team_admin.solution = ""
          end

          @team_admin.password = data[:password]
          @team_admin.save
          # res = {
          #   :status => "success",
          #   :text => "Account created. Please login now",
          # }
          @team_admin.regenerate_access_token
          res = {
            status: "success",
            token: @team_admin.access_token,
            admin_id: @team_admin.id,
          }

          if @team_admin.solution.downcase.include? "uniforms"
            res[:uniforms] = true

            if data[:sports].size == 1 and data[:sports][0].downcase == "uniforms"
              res[:only_uniform] = true
            end
          end
        end
      end

      if p.key? :xs_redirect
        redirect_to login_path
      else
        render :json => res
      end
      return
    end
    render(content_type: "application/liquid")
  end

  def signup_post
    @user_auth_process = true
    p = params.permit :xs_redirect, :team_admin => {}
    @team_admin = TeamAdmin.new

    if p.key? :team_admin
      data = p[:team_admin]
      res = {}
      if data[:email].empty? or data[:password].empty?
        res = {
          :status => "signup_error",
          :text => "Email/Password is required",
        }
      else
        @team_admin.email = data[:email]

        if TeamAdmin.find_by_email data[:email]
          res = {
            :status => "signup_error",
            :text => "Email is already registered with another account",
          }
        else
          @team_admin.first_name = data[:first_name]
          @team_admin.last_name = data[:last_name]
          @team_admin.phone = data[:phone]
          @team_admin.organization = data[:organization]
          @team_admin.team_number = data[:team_number]
          @team_admin.team_type = data[:team_type]
          @team_admin.role = data[:role]
          @team_admin.organization_name = data[:organization_name]

          if data[:sports].kind_of?(Array)
            @team_admin.sports = data[:sports].join ","
          else
            @team_admin.sports = data[:sports].to_s
          end
          if data[:solution] != nil
            @team_admin.solution = data[:solution].join ","
          else
            @team_admin.solution = ""
          end

          @team_admin.password = data[:password]
          @team_admin.save
          # res = {
          #   :status => "success",
          #   :text => "Account created. Please login now",
          # }
          @team_admin.regenerate_access_token
          res = {
            status: "success",
            token: @team_admin.access_token,
            admin_id: @team_admin.id,
          }

          if @team_admin.solution.downcase.include? "uniforms"
            res[:uniforms] = true

            if data[:sports].size == 1 and data[:sports][0].downcase == "uniforms"
              res[:only_uniform] = true
            end
            redirect_to login_path
            return
          else
            @s = Store.new
            @s.title = "Untitled"
            @s.team_admin = @team_admin
            @s.save
            res[:store_id] = @s.id
            res[:store_path] = store_setup_path @s.id
          end
        end
      end

      if p.key? :xs_redirect
        redirect_to login_path
      else
        render :json => res
      end
      return
    end
    render(content_type: "application/liquid")
  end

  def login
    @user_auth_process = true
    p = params.permit :email, :password
    @team_admin = TeamAdmin.new

    if p.key? :email
      response = {}
      admin = TeamAdmin.find_by_email p[:email]
      if admin
        if admin.authenticate p[:password]
          admin.regenerate_access_token
          response = {
            status: "success",
            token: admin.access_token,
            admin_id: admin.id,
          }
        else
          response = {
            error: "Username/Password is wrong",
          }
        end
      else
        response = {
          error: "Username/Password is wrong",
        }
      end
      render :json => response
      return
    end
    render(content_type: "application/liquid")
  end

  def logout
    @user_auth_process = true
    p = params.permit :id, :token
    response = {}
    if p.key? :id
      admin = TeamAdmin.find_by_id p[:id]
      if admin
        if admin.access_token == p[:token]
          admin.regenerate_access_token
          response = {
            :redirect => "login",
          }
        else
          response = {
            :redirect => "login",
          }
        end
      else
        response = {
          :redirect => "login",
        }
      end
    else
      response = {
        :redirect => "login",
      }
    end

    render :json => response
  end

  def verify_admin
    @user_auth_process = true
    p = params.permit :id, :token
    response = {}
    if p.key? :id
      admin = TeamAdmin.find_by_id p[:id]
      if admin
        if admin.access_token == p[:token]
          response = {
            :status => "success",
            :admin => "verified",
            :token => admin.access_token,
          }
        else
          response = {
            :redirect => "login",
          }
        end
      else
        response = {
          :redirect => "login",
        }
      end
    else
      response = {
        :redirect => "login",
      }
    end

    render :json => response
  end

  private

  def define_vars
    @parent_link = "/a/locker/"
    @alerts = []
  end

  def current_admin
    puts "admin_id"
    puts session[:admin_id]
    if session[:admin_id] != nil
      @admin = TeamAdmin.find_by_id session[:admin_id]
    else
      @admin = nil
    end
  end

  def logged_in?
    if session[:admin_id]
    else
      redirect_to action: "login"
    end
  end
end
