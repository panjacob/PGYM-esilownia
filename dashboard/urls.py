from django.urls import path

from dashboard import views

urlpatterns = [
    path('user_day/create', views.user_day_create, name='user_day_create'),
    path('user_day/get_all', views.user_day_get_all, name='user_day_get_all'),
    path('user_day/get', views.user_day_get, name='user_day_get'),
    path('achievment/create', views.achievment_create, name='achievment_create'),
    path('achievment/get', views.achievment_get, name='achievment_get'),
    path('achievment/all', views.achievment_all, name='achievment_all'),
    path('achievment/remove', views.achievment_remove, name='achievment_remove'),
    path('achievment/user/add', views.achievment_user_add, name='achievment_user_add'),
    path('achievment/user/remove', views.achievment_user_remove, name='achievment_user_remove'),
    path('achievment/user/get', views.achievnemt_user_get, name='achievment_user_get'),
]
