module Api
  module V1
    class TasksController < ApplicationController
      def index
        tasks = Task.all.order(deadline: :desc)
        render json: TaskSerializer.new(tasks).serializable_hash.to_json
      end

      def show
        task = Task.find(params[:id])
        render json: TaskSerializer.new(task).serializable_hash.to_json
      end
    end
  end
end