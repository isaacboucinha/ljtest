# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, controllers: {
    registrations: 'users/registrations',
    sessions: 'users/sessions'
  }

  get '/logged_in', to: 'users#logged_in'

  root 'homepage#index'

  namespace :api do
    namespace :v1 do
      get "/user_profiles", to: "user_profiles#index"
      get "/articles/:id", to: "articles#show"
    end
  end

  get '/*path' => 'homepage#index'
end
