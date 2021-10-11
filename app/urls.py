from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('test/', views.test_connection, name='test'),
    path('user/', views.user_info, name='index'),
    # path('login/', views.login, name='login'),
    path('register/', views.user_register, name='register'),
    # path('change_password/', views.change_password, name='change-password'),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/logout/', views.user_logout, name='logout'),
]
