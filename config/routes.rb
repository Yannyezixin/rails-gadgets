Rails.application.routes.draw do
  root 'index#index'

  get 'express-delivery/index', to: 'express_delivery#index', as: 'express'

  post 'express-delivery/search', to: 'express_delivery#search', as: 'express_search'

  get 'cet/index', to: 'cet#index', as: 'cet'

  post 'cet/search', to: 'cet#search', as: 'cet_search'

  get 'avatar', to: 'avatar#index', as: 'avatar'
  
  post 'avatar/upload', to: 'avatar#upload', as: 'avatar_upload'

  resources :todo do
    member do
      get 'status'
    end
  end

  get 'weather', to: 'weather#index', as: 'weather'
  post 'weather/search', to: 'weather#search', as: 'weather_search'
end
