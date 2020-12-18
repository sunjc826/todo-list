Rails.application.routes.draw do
  root "welcome#index"

  # note that the only: fields are not yet in sync with the controllers
  # e.g. some resources without :new still have :new fn in the controller 

  # TODO: nested resources (https://guides.rubyonrails.org/routing.html#nested-resources)

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
      resources :users, only: [:show, :create, :update, :destroy]
    end
  end

  # redirect all routing to be handled by React Router
  get '*path', to: "welcome#index"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
