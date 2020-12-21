class SessionsController < ApplicationController
  # authenticate is an alias for authenticate_password
  def create
    user = User
      .find_by(name: params[:user][:name], email: params[:user][:email])
      .try(:authenticate, params[:user][:password])

    if user
      session[:user_id] = user.id
      render json: {
        status: :created, #201
        logged_in: true,
        user: user
      }
    else
      render json: {
        status: :unauthorized #401
      }
    end

  end

end
