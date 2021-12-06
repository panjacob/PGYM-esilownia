from django.urls import path

from payment import views

urlpatterns = [
    path('transaction/create', views.transaction_create, name='transaction_create'),
    path('transaction/all', views.transaction_all, name='transaction_all'),
    path('offer/all', views.offer_all, name='offer_all'),
    path('training_transaction_user/get', views.training_transactions_user, name='training_transaction_user_get'),

]
