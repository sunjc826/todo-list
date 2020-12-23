module Api
  module V1
    class FiltersController < ApplicationController
      include CurrentUserConcern
      include RequireLoginConcern

      def create
        filter = @current_user.filters.new(filter_params)
        
        if filter.save
          render json: UserSerializer.new(@current_user, UsersController.options).serializable_hash.to_json
        else
          render status: :unprocessable_entity
        end
      end

      def destroy
      end

      private
      def filter_params
        params.require(:filter).permit(:description)
      end

      def tag_params
      end

      def label_params
      end
    end
  end
end
