module Api
  module V1
    class CommentsController < ApplicationController
      def index
        comments = Comment.all
        render json: CommentSerializer.new(comments).serializable_hash.to_json
      end

      def show
        comment = Comment.find(params[:id])
        render json: CommentSerializer.new(comment).serializable_hash.to_json
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
