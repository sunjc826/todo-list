require "active_support/concern"
module CurrentUserConcern
  extend ActiveSupport::Concern

  included do
    before_action :set_current_user
  end

  def set_current_user
    puts "CurrentUserConcern has been included"
    if session[:user_id]
      puts "Current user set"
      @current_user = User.find(session[:user_id])
    end
  end
end