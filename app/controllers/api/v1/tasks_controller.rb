module Api
  module V1
    class TasksController < ApplicationController
      include CurrentUserConcern
      include RequireLoginConcern
      
      def show
        # puts form_authenticity_token

        task = @current_user.tasks.find(params[:id])
        if task
          render json: TaskSerializer.new(task, TasksController.options).serializable_hash.to_json
        else
          render status: :not_found
        end
      end

      def create
        # puts task_params
        
        task = @current_user.tasks.new(task_params)
        if task.save
          render json: UserSerializer.new(@current_user, UsersController.options).serializable_hash.to_json
        else
          render status: :unprocessable_entity
        end
      end


      def self.options
        options = {}
        options[:include] = [:subtasks, :comments]
        return options
      end

      private
      def task_params
        params.require(:task).permit(:content, :deadline, :priority, :completed, :project_id)
      end
    end
  end
end