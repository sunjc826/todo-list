module Api
  module V1
    class TagsController < ApplicationController
      include CurrentUserConcern
      include RequireLoginConcern

      def show
        tag = @current_user.tags.find(params[:id])
        render json: TagSerializer.new(tag).serializable_hash.to_json
      end
    end
  end
end
