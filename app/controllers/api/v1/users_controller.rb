module Api
  module V1
    class UsersController < ApplicationController
      def show
        user = User.find(params[:id])
        
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
