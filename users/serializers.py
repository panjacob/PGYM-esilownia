from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from users import utilis
from users.models import UserExtended


class UserInfoSerializer(ModelSerializer):
    class Meta:
        model = UserExtended
        fields = ['id', 'email', 'username', 'first_name', 'last_name', 'start_date', 'is_staff',
                  'is_active', 'is_superuser', 'is_coach', 'is_dietician']


class UserEditSerializer(ModelSerializer):
    class Meta:
        model = UserExtended
        fields = ['email', 'username', 'first_name', 'last_name']

        def update(self, instance, validated_data):
            instance.email = validated_data.get('email', instance.email)
            instance.user_name = validated_data.get('username', instance.user_name)
            instance.first_name = validated_data.get('first_name', instance.first_name)
            instance.last_name = validated_data.get('last_name', instance.last_name)
            instance.save()
            return instance


class UserRegisterSerializer(ModelSerializer):
    class Meta:
        model = UserExtended
        fields = ('email', 'username', 'password', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            if utilis.validate_password(password):
                instance.set_password(password)
        instance.save()
        return instance


class UserChangePasswordSerializer(serializers.Serializer):
    model = UserExtended

    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
