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
        
        user.tags.new([
          {
            description: "Work"
          },
          {
            description: "Social"
          },
          {
            description: "Personal"
          }
        ])

        if user.save
          session[:user_id] = user.id
          render json: {
            status: :created,
            user_id: user.id,
            created: true
          }
        else
          render json: {
            status: :unprocessable_entity,
            created: false
          }
        end

      end
    end
  end
end
