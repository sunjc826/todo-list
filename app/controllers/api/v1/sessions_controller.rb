module Api
  module V1
    class SessionsController < ApplicationController
      include CurrentUserConcern

      # login
      def create
        # authenticate is an alias for authenticate_password
        user = User
          .find_by(email: params[:user][:email])
          .try(:authenticate, params[:user][:password])

        if user
          session[:user_id] = user.id
          render json: {
            status: :created, #201
            logged_in: true,
            user_id: user.id,
          }
        else
          render json: {
            status: :unauthorized #401
          }
        end
      end

      # is_logged_in
      def index
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
      # the method is not named destroy since destroy (conventionally) requires an id
      def logout
        reset_session
        render json: {
          status: :ok,
          logged_out: true
        }
      end

    end
  end
end
