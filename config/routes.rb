Rails.application.routes.draw do
  resources :tables do
    resources :lists do
      resources :cards
    end
  end
  root 'tables#index'
end
