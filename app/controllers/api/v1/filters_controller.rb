module Api
  module V1
    class FiltersController < ApplicationController
      include CurrentUserConcern
      include RequireLoginConcern

      def create
        filter = @current_user.filters.new(filter_params)
        tags = tag_params[:tags]
        labels = label_params[:labels]

        tags.each do |tag_id, presence|
          if presence
            tag = @current_user.tags.find(tag_id)
            # Only one of these 2 are needed
            # If both are executed, rails will actually create 2 FilterCriterium objects
            # tag.filters << filter
            filter.tags << tag
          end
        end

        labels.each do |label_id, presence|
          if presence
            label = @current_user.labels.find(label_id)
            # label.filters << filter
            filter.labels << label
          end
        end


        if filter.save
          render json: UserSerializer.new(@current_user, UsersController.options).serializable_hash.to_json
        else
          render status: :unprocessable_entity
        end
      end

      def destroy
      end

      private
      def filter_params
        params.require(:filter).permit(:description)
      end

      def tag_params
        params.require(:tag).permit(tags: {})
      end

      def label_params
        params.require(:label).permit(labels: {})
      end
    end
  end
end
