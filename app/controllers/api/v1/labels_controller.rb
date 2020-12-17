module Api
  module V1
    class LabelsController < ApplicationController
      def index
        label = Label.all
        render json: LabelSerializer.new(labels).serializable_hash.to_json
      end

      def show
        label = Label.find(params[:id])
        render json: LabelSerializer.new(label).serializable_hash.to_json
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