from rest_framework.serializers import ModelSerializer

from moderator.models import Application


class ApplicationCreateSerializer(ModelSerializer):
    class Meta:
        model = Application
        fields = ['owner', 'description']


class ApplicationGetSerializer(ModelSerializer):
    class Meta:
        model = Application
        fields = ['id', 'date', 'owner', 'description', 'active']
