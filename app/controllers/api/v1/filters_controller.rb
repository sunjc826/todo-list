module Api
  module V1
    class FiltersController < ApplicationController
      include CurrentUserConcern

      def show
        filter = Filter.find(params[:id])
        render json: FilterSerializer.new(filter).serializable_hash.to_json
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
