Rails.application.routes.draw do
  root "welcome#index"
  get "/welcome", to: "welcome#index"
  get "/welcome/index", to: "welcome#index"

  namespace :api do
    namespace :v1 do
      resources :comments, only: [:create, :update, :destroy]
      resources :filter_criteria
      resources :filters
      resources :label_tasks
      resources :labels
      resources :projects
      resources :subtasks, only: [:create, :update, :destroy]
      resources :tag_tasks
      resources :tags
      resources :tasks
      resources :users
    end
  end

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
