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
          # Only one of these 2 are needed
          # If both are executed, rails will actually create 2 TagTask objects
          # tag.tasks << task
          task.tags << tag
        end
        # Not using this because I did not create has_many tag_tasks in User model
        # tag_task = @current_user.tag_tasks.create(task_id: task.id, tag_id: tag_params[:tag_id])


        label_id = label_params[:label_id]
        unless label_id.nil?
          label = @current_user.labels.find(label_id)
          # label.tasks << task
          task.labels << label
        end

        tag_ids = filter_params[:tag_ids]
        label_ids = filter_params[:label_ids]
        tag_ids.each do |tag_id|
          tag = @current_user.tags.find(tag_id)
          task.tags << tag
        end

        label_ids.each do |label_id|
          label = @current_user.labels.find(label_id)
          task.labels << label
        end

        if task.save
          response.headers["last_created_task_id"] = task.id
          render json: UserSerializer.new(@current_user, UsersController.options).serializable_hash.to_json
        else
          render status: :unprocessable_entity
        end
      end


      def destroy
        task_id = params[:id]
        to_destroy = @current_user.tasks.find(task_id)
        to_destroy.destroy

        if to_destroy.destroyed?
          render json: UserSerializer.new(@current_user, UsersController.options).serializable_hash.to_json
        else
          render status: :bad_request
        end
      end

      def update
        task_id = params[:id]
        task = @current_user.tasks.find(task_id)

        tag_ids = filter_params[:tag_ids]
        label_ids = filter_params[:label_ids]
        task.tags.delete_all
        task.labels.delete_all
        tag_ids.each do |tag_id|
          tag = @current_user.tags.find(tag_id)
          task.tags << tag
        end

        label_ids.each do |label_id|
          label = @current_user.labels.find(label_id)
          task.labels << label
        end
        
        if task.update(task_params)
          render json: UserSerializer.new(@current_user, UsersController.options).serializable_hash.to_json
        else
          render status: :unprocessable_entity
        end
      end

      # set task as complete/incomplete
      def complete
        task_id = params[:id]
        task = @current_user.tasks.find(task_id)
        
        # if uncompleting a task belonging to a project, uncomplete the project as well
        if task.project && task.completed
          task.project.update({completed: false})
        end

        if task.update({ completed: !task.completed })
          render json: TaskSerializer.new(task, {include: [:project]}).serializable_hash.to_json
        else
          render status: :unprocessable_entity
        end
      end
      

      # helper functions

      def self.options
        options = {}
        options[:include] = [:subtasks, :comments, :activities]
        return options
      end

      private
      def task_params
        params.require(:task).permit(:content, :deadline, :priority, :completed, :project_id)
      end
      
      def tag_params
        params.require(:tag).permit(:tag_id)
      end

      def label_params
        params.require(:label).permit(:label_id)
      end

      def filter_params
        params.require(:filter).permit(tag_ids: [], label_ids: [])
      end

    end
  end
end