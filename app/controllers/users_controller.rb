class UsersController < ApplicationController
  def logged_in
    render json: {logged_in: user_signed_in?, user: current_user}
  end
end
