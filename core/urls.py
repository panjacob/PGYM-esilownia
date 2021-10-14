from django.contrib import admin
from django.urls import include, path
# from rest_framework_simplejwt.views import (
#     TokenObtainPairView,
#     TokenRefreshView,
# )

urlpatterns = [
    path('auth/', include('drf_social_oauth2.urls', namespace='drf')),
    path('users/', include('users.urls')),
    path('admin/', admin.site.urls),
    # path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
