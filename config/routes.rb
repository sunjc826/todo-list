Rails.application.routes.draw do
  root "welcome#index"

  # note that the only: fields are not yet in sync with the controllers
  # e.g. some resources without :new still have :new fn in the controller 


  namespace :api do
    namespace :v1 do
      # authentication
      resources :registrations, only: [:create]
      resources :sessions, only: [:index, :create]
      delete "/sessions/logout", to: "sessions#logout"

      resources :filter_criteria
      resources :filters
      resources :label_tasks
      resources :labels
      resources :projects
      resources :tag_tasks
      resources :tags, only: [:index]
      resources :tasks do
        resources :subtasks, only: [:create, :update, :destroy]
        resources :comments, only: [:create, :update, :destroy]
        resources :activities, only: [:create]
      end
      patch "/tasks/:id/complete", to: "tasks#complete"

      resources :users, only: [:show, :create, :update, :destroy]
    end
  end

  # redirect all routing to be handled by React Router
  get '*path', to: "welcome#index"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
