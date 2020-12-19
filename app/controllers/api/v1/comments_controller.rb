module Api
  module V1
    class CommentsController < ApplicationController
      protect_from_forgery with: :null_session

      def index
        comments = Comment.all
        render json: CommentSerializer.new(comments).serializable_hash.to_json
      end

      def show
        comment = Comment.find(params[:id])
        render json: CommentSerializer.new(comment).serializable_hash.to_json
      end

      def create
        task = Task.find(params[:task_id])
        comment = task.comments.new(comment_params)

        if comment.save
          render json: TaskSerializer.new(task, TasksController.options).serializable_hash.to_json
        else
          render json: {error: comment.errors.full_messages}, status: :unprocessable_entity
        end
      end

      def destroy
      end

      private
        def comment_params
          params.require(:comment).permit(:content)
        end


    end
  end
end
