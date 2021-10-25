from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from trainings.models import TrainingGroup, TrainingGroupTypes


class TrainingGroupTypesSerializer(ModelSerializer):
    model = TrainingGroupTypes
    fields = ['id']


class TrainingGroupSerializerCreate(ModelSerializer):
    class Meta:
        model = TrainingGroup
        owner = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
        type = TrainingGroupTypesSerializer(read_only=True, many=True)

        fields = ['owner', 'date', 'difficulty', 'title', 'description', 'type']
