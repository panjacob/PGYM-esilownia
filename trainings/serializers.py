from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from trainings.models import TrainingGroup, TrainingGroupTypes, Files


class TrainingGroupTypesSerializer(ModelSerializer):
    model = TrainingGroupTypes
    fields = ['id']


class FilesSerializer(ModelSerializer):
    model = Files
    training_group = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    owner = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
    fields = ['my_file', 'owner']


class TrainingGroupSerializerCreate(ModelSerializer):
    class Meta:
        model = TrainingGroup
        owner = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
        type = TrainingGroupTypesSerializer(read_only=True, many=True)

        fields = ['owner', 'date', 'difficulty', 'title', 'description', 'type']
