module Api
  module V1
    class TagsController < ApplicationController
      include CurrentUserConcern
      include RequireLoginConcern

      def index
        # TODO: 
        # Currently this will return all tasks associated with this tag
        # Need to restrict to only the tasks owned by the current user
        tags = Tag.all
        render json: TagSerializer.new(tags).serializable_hash.to_json
      end
    end
  end
end
