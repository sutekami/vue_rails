Rails.application.routes.draw do
  get '/get_csrf_token', to: 'csrf_token#show'
  
  post '/sign_in', to: 'api#index'
  post '/sign_up', to: 'api#create'

  post '/get_my_task', to: 'task#index'
  post '/create_task', to: 'task#create'
end
