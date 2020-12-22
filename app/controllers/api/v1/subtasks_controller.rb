module Api
  module V1
    class SubtasksController < ApplicationController
      include CurrentUserConcern
      include RequireLoginConcern
      def show
        subtask = @current_user.tasks.find(params[:task_id]).try(:subtasks).try(:find, params[:id])
        if subtask
          render json: SubtaskSerializer.new(subtask).serializable_hash.to_json
        else
          render status: :not_found
        end
      end

      def create
        # Note to self: Need to start from @current_user
        # This is so that we can confirm that the user in the current session is the same as the user who owns the task
        task = @current_user
          .tasks
          .find(params[:task_id])
        # TODO: https://stackoverflow.com/questions/37977721/why-is-safe-navigation-better-than-using-try-in-rails
        # apparently "try" is not the best way to do things?
        subtask = task
          .try(:subtasks)
          .try(:new, subtask_params)

        if subtask && subtask.save
          render json: TaskSerializer.new(task, TasksController.options).serializable_hash.to_json
        else
          render status: :unprocessable_entity
        end
      end

      private
      def subtask_params
        params.require(:subtask).permit(:content, :completed)
      end
    end
  end
end
