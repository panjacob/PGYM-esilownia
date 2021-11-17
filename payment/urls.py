from django.urls import path

from payment import views

urlpatterns = [
    path('transaction/create', views.transaction_create, name='transaction_create'),

]
