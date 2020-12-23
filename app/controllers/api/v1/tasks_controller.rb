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
        
        task = @current_user.tasks.new(task_params)
        
        tag_id = tag_params[:tag_id]
        # For some reason, placing the next 3 lines within task.save does not work
        # Perhaps it has something to do with the save method.
        unless tag_id.nil?
          tag = @current_user.tags.find(tag_id)
          tag.tasks << task
          task.tags << tag
        end

        # Not using this because I did not create has_many tag_tasks in User model
        # tag_task = @current_user.tag_tasks.create(task_id: task.id, tag_id: tag_params[:tag_id])

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
      
      def tag_params
        params.require(:tag).permit(:tag_id)
      end
    end
  end
end