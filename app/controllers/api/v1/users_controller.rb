module Api
  module V1
    class UsersController < ApplicationController
      include CurrentUserConcern
      include RequireLoginConcern

      def index
        render json: UserSerializer.new(User.all).serializable_hash.to_json
      end

      def show
        # puts form_authenticity_token
        render json: UserSerializer.new(@current_user, UsersController.options).serializable_hash.to_json
      end
      
      def change_password
        # https://api.rubyonrails.org/classes/ActiveModel/SecurePassword/ClassMethods.html#method-i-has_secure_password
        query = password_params
        puts query[:current_password]
        puts query[:new_password]
        if @current_user.authenticate(query[:current_password])
          @current_user.update({password: query[:new_password]})
          render json: {message: "Successfully changed password", reset: true}
        else
          render json: {message: "Current password is wrong!", reset: false}
        end
      end

      def self.options
        options = {}
        options[:include] = [:filters, :labels, :projects, :tasks, :tags, :activities, :shared_projects]
        return options
      end

      private
      # Alternatively
      # https://stackoverflow.com/questions/1509915/converting-camel-case-to-underscore-case-in-ruby
      def password_params
        params.require(:passwords).permit(:current_password, :new_password, :confirm_password)
      end
      
    end
  end
end
