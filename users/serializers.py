from rest_framework.serializers import ModelSerializer

from users.models import UserExtended


class UserInfoSerializer(ModelSerializer):
    class Meta:
        model = UserExtended
        fields = ['id', 'email', 'user_name', 'first_name', 'last_name', 'start_date', 'is_staff',
                  'is_active', 'is_superuser']


class UserRegisterSerializer(ModelSerializer):
    class Meta:
        model = UserExtended
        fields = ('email', 'user_name', 'password', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            # TODO: wzmocnienie hasla
            instance.set_password(password)
        instance.save()
        return instance
