from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('auth/', include('drf_social_oauth2.urls', namespace='drf')),
    path('users/', include('users.urls')),
    path('dashboard/', include('dashboard.urls')),
    path('training/', include('training.urls')),
    path('admin/', admin.site.urls),
]
