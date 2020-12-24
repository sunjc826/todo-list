module Api
  module V1
    class ProjectsController < ApplicationController
      include CurrentUserConcern
      include RequireLoginConcern

      def show
        project = @current_user.projects.find(params[:id])
        render json: ProjectSerializer.new(project).serializable_hash.to_json
      end

      def create
        project = @current_user.projects.new(project_params)
        
        if project.save
          response.headers["last_created_project_id"] = project.id
          render json: UserSerializer.new(@current_user, ProjectsController.options(project.id)).serializable_hash.to_json
        else
          render json: :unprocessable_entity
        end
      end

      def destroy
        project_id = params[:id]
        to_destroy = @current_user.projects.find(project_id)
        to_destroy.destroy
        if to_destroy.destroyed?
          render json: UserSerializer.new(@current_user, UsersController.options).serializable_hash.to_json
        else
          render json: :unprocessable_entity
        end
      end

      def self.options(last_created_project_id)
        options = UsersController.options
        # Not sure how the :meta tag works
        # options[:meta] = { last_created_project_id: last_created_project_id }
        return options
      end

      private
      def project_params
        params.require(:project).permit(:title, :content, :completed)
      end
    end
  end
end
