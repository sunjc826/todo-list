module Api
  module V1
    class TagsController < ApplicationController
      def index
        tags = Tag.all
        render json: TagSerializer.new(tags).serializable_hash.to_json
      end

      def show
        tag = Tag.find(params[:id])
        render json: TagSerializer.new(tag).serializable_hash.to_json
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
