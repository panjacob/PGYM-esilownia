from django.urls import path

from forum import views

urlpatterns = [
    path('topic/create', views.topic_create, name='topic_create'),
    path('topic/get', views.topic_get, name='topic_get'),
    path('topic/all', views.topic_all, name='topic_all'),
    path('topic/remove', views.topic_remove, name='topic_remove'),
    path('post/create', views.post_create, name='post_create'),
    path('post/get', views.post_get, name='post_get'),

]
