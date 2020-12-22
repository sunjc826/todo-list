module Api
  module V1
    class ProjectsController < ApplicationController
      include CurrentUserConcern

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
