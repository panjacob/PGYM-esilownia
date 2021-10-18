from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from trainings.models import TrainingGroup


class TrainingGroupSerializer(ModelSerializer):
    class Meta:
        model = TrainingGroup
        user = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
        fields = ['date', 'difficulty', 'title', 'description']

    # def create(self, validated_data):
    #     instance = self.Meta.model(**validated_data)
    #     instance.save()
    #     return instance
