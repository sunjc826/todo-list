module Api
  module V1
    class LabelTasksController < ApplicationController
      include CurrentUserConcern
      include RequireLoginConcern

      def create
        
      end
    end
  end
end

