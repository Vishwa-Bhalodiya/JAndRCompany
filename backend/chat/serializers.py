from rest_framework import serializers

from .models import ChatMessage, ChatSession


class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ["id", "role", "content", "created_at"]


class ChatSessionSerializer(serializers.ModelSerializer):
    """Full detail view, including every message — used for the admin transcript view."""

    messages = ChatMessageSerializer(many=True, read_only=True)
    username = serializers.CharField(source="user.username", read_only=True)
    email = serializers.CharField(source="user.email", read_only=True)

    class Meta:
        model = ChatSession
        fields = ["id", "username", "email", "created_at", "updated_at", "messages"]


class ChatSessionListSerializer(serializers.ModelSerializer):
    """Lightweight list view for the admin dashboard — one preview line, not the full transcript."""

    username = serializers.CharField(source="user.username", read_only=True)
    email = serializers.CharField(source="user.email", read_only=True)
    message_count = serializers.IntegerField(source="messages.count", read_only=True)
    last_message = serializers.SerializerMethodField()

    class Meta:
        model = ChatSession
        fields = ["id", "username", "email", "created_at", "updated_at", "message_count", "last_message"]

    def get_last_message(self, obj):
        last = obj.messages.last()
        return last.content[:120] if last else ""
