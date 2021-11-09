from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from dashboard.models import UserDay, Achievement


class UserDaySerializer(ModelSerializer):
    class Meta:
        model = UserDay
        user = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
        fields = ['user', 'date', 'weight', 'sleep_start', 'sleep_end', 'calories_burned', 'calories_eaten', 'steps']

    def update_or_create(self, user_id, validated_data):
        instance, created = UserDay.objects.get_or_create(user_id=user_id, date=validated_data.pop('date', None))
        instance.sleep_start = validated_data.pop('sleep_start', None)
        instance.sleep_end = validated_data.pop('sleep_end', None)
        instance.calories_eaten = validated_data.pop('calories_eaten', None)
        instance.calories_burned = validated_data.pop('calories_burned', None)
        instance.steps = validated_data.pop('steps', None)
        instance.weight = validated_data.pop('weight', None)

        instance.save()
        return created


class AchievmentSerializer(ModelSerializer):
    class Meta:
        model = Achievement
        # owner = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
        fields = ['title', 'description', 'image']
