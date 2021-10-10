from rest_framework.serializers import ModelSerializer

from app.models import UserExtended


class UserSerializer(ModelSerializer):
    class Meta:
        model = UserExtended
        fields = ['id', 'email', 'user_name', 'first_name', 'last_name', 'start_date', 'is_staff',
                  'is_active', 'is_superuser']
