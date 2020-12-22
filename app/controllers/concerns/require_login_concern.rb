require "active_support/concern"
module RequireLoginConcern
  extend ActiveSupport::Concern
  
  included do
    before_action :require_login, only: [:show]
  end

  # checks if there exists some user who is logged in
  def require_login
    if @current_user
      # Do nothing
    else
      puts "No session"
      render json: {error: "Not logged in"}, status: :unauthorized
    end
  end
end