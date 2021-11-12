from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from message.models import Message


class MessageCreateSerializer(ModelSerializer):
    class Meta:
        model = Message
        sender = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
        receiver = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
        fields = ['sender', 'receiver', 'message']


class MessageGetSerializer(ModelSerializer):
    class Meta:
        model = Message
        sender = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
        receiver = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
        fields = ['time', 'sender', 'receiver', 'message']
