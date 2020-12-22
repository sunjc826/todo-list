module Api
  module V1
    class CommentsController < ApplicationController
      include CurrentUserConcern
      include RequireLoginConcern
      def show
        comment = Comment.find(params[:id])
        render json: CommentSerializer.new(comment).serializable_hash.to_json
      end

      def create
        task = @current_user
          .tasks
          .find(params[:task_id])
        comment = task
          .try(:comments)
          .try(:new, comment_params)

        if comment && comment.save
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
