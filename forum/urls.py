from django.urls import path

from forum import views

urlpatterns = [
    path('topic/create', views.topic_create, name='topic_create'),
    path('topic/get', views.topic_get, name='topic_get'),

]
