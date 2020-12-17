module Api
  module V1
    class SubtasksController < ApplicationController
      def index
        subtasks = Subtask.all
        render json: SubtaskSerializer.new(subtasks).serializable_hash.to_json
      end

      def show
        subtask = Subtask.find(params[:id])
        render json: SubtaskSerializer.new(subtask).serializable_hash.to_json
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
