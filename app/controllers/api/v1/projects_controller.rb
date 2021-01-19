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
          render json: :bad_request
        end
      end

      def complete
        project_id = params[:id]
        project = @current_user.projects.find(project_id)
        # https://stackoverflow.com/questions/20779746/difference-between-save-and-update-in-using-with-different-http-requests
        # Alternative to xxx.update({new_attr}) is to directly modify attributes and then calling save

        if project.completed # set project and related tasks to uncompleted
          project.completed = false
          project.tasks.each do |task|
            task.completed = false
            task.save!
          end
        else # set project and related tasks to completed
          project.completed = true
          project.tasks.each do |task|
            task.completed = true
            task.save!
          end
        end

        if project.save
          render json: ProjectSerializer.new(project, {include: [:tasks]}).serializable_hash.to_json
        else
          render json: :unprocessable_entity
        end
      end

      def share
        project_id = params[:id]
        share_id = params[:user_id]
        project = @current_user.projects.find(project_id)
        # get user to share project with
        share_user = User.find(share_id)
        # add this user to the list of shared_users of the project
        project.shared_users << share_user

        if project.save
          render json: ProjectSerializer.new(project, {include: [:tasks]}).serializable_hash.to_json
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
