class ApplicationController < ActionController::Base
  # all works when testing with Insomnia
  skip_before_action :verify_authenticity_token
  # skip_forgery_protection
  # protect_from_forgery with: :null_session
end
