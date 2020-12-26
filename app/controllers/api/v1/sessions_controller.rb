module Api
  module V1
    class SessionsController < ApplicationController
      include CurrentUserConcern

      # login
      def create
        puts form_authenticity_token
        # puts session[:_csrf_token]
        user = User
          .find_by(email: params[:user][:email])
          .try(:authenticate, params[:user][:password])

        if user
          session[:user_id] = user.id
          render json: {
            status: :created, #201
            logged_in: true,
            user_id: user.id
          }
        else
          render json: {
            status: :unauthorized, #401
            logged_in: false
          }
        end
      end

      # is_logged_in
      def index
        puts form_authenticity_token
        # puts session[:_csrf_token]
        if @current_user
          render json: {
            logged_in: true,
            user_id: @current_user.id
          }
        else 
          render json: {
            logged_in: false
          }
        end
      end
      
      # logout
      def logout
        puts form_authenticity_token
        puts "Logged out"
        reset_session
        @current_user = nil
        render json: {
          status: :ok,
          logged_out: true
        }
      end

    end
  end
end
