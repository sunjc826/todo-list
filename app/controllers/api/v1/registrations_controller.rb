module Api
  module V1
    class RegistrationsController < ApplicationController
      def create
        user = User.new({
          name: params[:user][:name],
          email: params[:user][:email],
          password: params[:user][:password],
          password_confirmation: params[:user][:password_confirmation]
        })

        if user.save
          session[:user_id] = user.id
          render json: {
            status: :created,
            user_id: user.id,
          }
        else
          render json: {
            status: :unprocessable_entity
          }
        end

      end
    end
  end
end
