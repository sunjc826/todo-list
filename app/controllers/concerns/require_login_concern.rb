require "active_support/concern"
module RequireLoginConcern
  extend ActiveSupport::Concern
  
  included do
    before_action :require_login, only: [:show]
  end

  def require_login
    if @current_user
      puts "Comparing"
      puts @current_user.id
      puts params[:id]
      if @current_user.id == params[:id].to_i
        # do nothing
      else
        render json: {error: "Different user"}, status: :unauthorized
      end
    else
      puts "Not logged in"
      render json: {error: "Not logged in"}, status: :unauthorized
    end
  end
end