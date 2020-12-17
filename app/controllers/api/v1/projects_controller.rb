module Api
  module V1
    class ProjectsController < ApplicationController
      def index
        projects = Project.all
        render json: ProjectSerializer.new(projects).serializable_hash.to_json
      end

      def show
        project = Project.find(params[:id])
        render json: ProjectSerializer.new(project).serializable_hash.to_json
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
