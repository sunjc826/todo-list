module Api
  module V1
    class LabelsController < ApplicationController
      include CurrentUserConcern
      include RequireLoginConcern

      def show
        label = @current_user.labels.find(params[:id])
        render json: LabelSerializer.new(label).serializable_hash.to_json
      end

      def create
        label = @current_user.labels.new(label_params)

        if label.save
          render json: UserSerializer.new(@current_user, UsersController.options).serializable_hash.to_json
        else
          render status: :unprocessable_entity
        end
      end

      def destroy
        label_id = params[:id]
        to_destroy = @current_user.labels.find(label_id)
        to_destroy.destroy
        if to_destroy.destroyed?
          render json: UserSerializer.new(@current_user, UsersController.options).serializable_hash.to_json
        else
          render status: :bad_request
        end
      end

      private
      def label_params
        params.require(:label).permit(:description, :color)
      end
    end
  end
end