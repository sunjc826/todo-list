module Api
  module V1
    class TasksController < ApplicationController
      def index
        tasks = Task.all.order(deadline: :desc) # sorting unnecessary
        render json: TaskSerializer.new(tasks).serializable_hash.to_json
      end

      def show
        task = Task.find(params[:id])
        render json: TaskSerializer.new(task, self.options).serializable_hash.to_json
      end


      private
        def options
          options = {}
          options[:include] = [:subtasks]
          return options
        end
    end
  end
end