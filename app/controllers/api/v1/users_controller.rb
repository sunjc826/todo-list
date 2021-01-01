module Api
  module V1
    class UsersController < ApplicationController
      include CurrentUserConcern
      include RequireLoginConcern

      def show
        # puts form_authenticity_token
        render json: UserSerializer.new(@current_user, UsersController.options).serializable_hash.to_json
      end
      

      def self.options
        options = {}
        options[:include] = [:filters, :labels, :projects, :tasks, :tags, :activities]
        return options
      end

      
    end
  end
end
