from django.urls import path

from diet import views

urlpatterns = [
    # path('transaction/create', views.transaction_create, name='transaction_create'),
    path('group/create', views.diet_group_create, name='diet_group_create'),
]
