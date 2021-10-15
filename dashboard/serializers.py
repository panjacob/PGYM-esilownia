from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from dashboard.models import UserDay


class UserDaySerializer(ModelSerializer):
    class Meta:
        model = UserDay
        user = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
        fields = ['user', 'date', 'sleep_start', 'sleep_end', 'calories_burned', 'calories_eaten', 'steps']
