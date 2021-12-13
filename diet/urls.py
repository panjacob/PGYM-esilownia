from django.urls import path

from diet import views

urlpatterns = [
    path('group/create', views.diet_group_create, name='diet_group_create'),
    path('group/edit', views.diet_group_edit, name='diet_group_edit'),
    path('group/get', views.diet_group_get, name='diet_group_get'),
    path('group/join', views.diet_group_join, name='diet_group_join'),
]
