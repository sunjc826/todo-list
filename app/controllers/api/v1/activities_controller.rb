module Api
  module V1
    class ActivitiesController < ApplicationController
      include CurrentUserConcern
      include RequireLoginConcern

      def create
        task = @current_user
          .tasks
          .find(params[:task_id])
        activity = task.activities.new(activity_params)

        if activity.save
          render json: TaskSerializer.new(task, TasksController.options).serializable_hash.to_json
        else
          render json: {error: activity.errors.full_messages}, status: :unprocessable_entity
        end
      end

      private
      def activity_params
        params.require(:activity).permit(:crud_type, :item)
      end

    end
  end
end

