from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from users.views import auth_token_wrapper_check_ban

urlpatterns = [
    path('auth/token/', auth_token_wrapper_check_ban, name='drf'),
    path('auth/', include('drf_social_oauth2.urls', namespace='drf')),

    path('users/', include('users.urls')),
    path('dashboard/', include('dashboard.urls')),
    path('training/', include('training.urls')),
    path('moderator/', include('moderator.urls')),
    path('message/', include('message.urls')),
    path('payment/', include('payment.urls')),
    path('diet/', include('diet.urls')),
    path('forum/', include('forum.urls')),
    path('admin/', admin.site.urls),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
