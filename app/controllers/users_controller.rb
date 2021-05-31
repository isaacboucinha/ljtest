class UsersController < ApplicationController
  def logged_in
    render json: current_user.to_json(include: { user_profiles: { only: :profile_username } })
  end
end
