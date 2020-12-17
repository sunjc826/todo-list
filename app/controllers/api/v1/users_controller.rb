module Api
  module V1
    class UsersController < ApplicationController
      def show
        user = User.find(params[:id])
        render json: UserSerializer.new(user).serializable_hash.to_json
      end

      def new
        
      end

      def create
      end

      def destroy
      end

    end
  end
end
