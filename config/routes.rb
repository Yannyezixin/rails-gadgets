Rails.application.routes.draw do
  root 'index#index'

  get 'express-delivery/index', to: 'express_delivery#index', as: 'express'

  post 'express-delivery/search', to: 'express_delivery#search', as: 'express_search'

  get 'cet/index', to: 'cet#index', as: 'cet'

  post 'cet/search', to: 'cet#search', as: 'cet_search'
end
