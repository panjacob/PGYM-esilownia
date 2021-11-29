from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from forum.models import Topic, Post


class PostSerializer(ModelSerializer):
    class Meta:
        model = Post
        owner = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
        optional_fields = ['date']
        fields = ['owner', 'date', 'body']


class TopicSerializerCreate(ModelSerializer):
    class Meta:
        model = Topic
        optional_fields = ['date', 'posts']
        owner = serializers.PrimaryKeyRelatedField(many=False, read_only=True)

        fields = ['owner', 'date', 'title', 'body']


class TopicSerializerGet(ModelSerializer):
    class Meta:
        model = Topic
        owner = serializers.PrimaryKeyRelatedField(many=False, read_only=True)
        topics = PostSerializer(read_only=True, many=True)

        fields = ['owner', 'date', 'title', 'body', 'posts']
