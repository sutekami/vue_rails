Rails.application.routes.draw do
  get '/get_csrf_token', to: 'csrf_token#show'
  
  get '/session_login', to:'api#s_login'
  post '/sign_in', to: 'api#index'
  post '/sign_up', to: 'api#create'

  get '/get_all_task', to: 'task#get_all_task'
  post '/get_my_task', to: 'task#index'
  post '/create_task', to: 'task#create'
  post '/delete_task', to: 'task#delete'
  post '/complete_task', to: 'task#update'

  post '/follow', to: 'follow#create'
  post '/get_following', to: 'follow#index'
end
