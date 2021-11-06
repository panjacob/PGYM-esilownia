from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('auth/', include('drf_social_oauth2.urls', namespace='drf')),
    path('users/', include('users.urls')),
    path('dashboard/', include('dashboard.urls')),
    path('training/', include('training.urls')),
    path('moderator/', include('moderator.urls')),
    path('admin/', admin.site.urls),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
