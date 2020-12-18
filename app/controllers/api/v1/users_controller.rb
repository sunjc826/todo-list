module Api
  module V1
    class UsersController < ApplicationController
      def show
        user = User.find(params[:id])
        render json: UserSerializer.new(user, self.options).serializable_hash.to_json
      end

      def new
        
      end

      def create
      end

      def destroy
      end
      
      private

        def options
          options = {}
          options[:include] = [:filters, :labels, :projects, :tasks]
          return options
        end
    end
  end
end
