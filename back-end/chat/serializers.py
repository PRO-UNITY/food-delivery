from rest_framework import serializers
from authen.serializers.authen_serializers import UserInformationSerializer
from chat.models import Room, Message, NotificationChat


class MessageSerializer(serializers.ModelSerializer):
    text = serializers.CharField(required=True)

    class Meta:
        model = Message
        fields = ['id', "sender", 'text', 'conversation_id', 'timestamp']

    def create(self, validated_data):
        sender = self.context.get('request')
        conversation = self.context.get('conversation')
        create_message = Message.objects.create(**validated_data)
        create_message.sender = sender.user
        create_message.conversation_id = conversation
        create_message.save()
        if sender:
            if conversation.initiator == sender.user:
                notification_sent = NotificationChat.objects.create(
                    message = conversation,
                    user=create_message.conversation_id.receiver,
                )
            elif conversation.receiver == sender.user:
                notification_sent = NotificationChat.objects.create(
                    message = conversation,
                    user=create_message.conversation_id.initiator,
                )
        return create_message


class ConversationListSerializer(serializers.ModelSerializer):
    initiator = UserInformationSerializer(read_only=True)
    receiver = UserInformationSerializer(read_only=True)

    class Meta:
        model = Room
        fields = ['id', 'initiator', 'receiver']


class MessageListSerializer(serializers.ModelSerializer):
    sender = UserInformationSerializer(read_only=True)
    sender_type = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = ['id', 'sender', 'text', 'sender_type', 'timestamp']

    def get_sender_type(self, obj):
        request = self.context.get('request')
        user = request.user

        if user:
            conversation = obj.conversation_id
            if conversation.initiator == user:
                return 'initiator'
            elif conversation.receiver == user:
                return 'receiver'
        return 'unknown'

class ConversationSerializer(serializers.ModelSerializer):
    initiator = UserInformationSerializer(read_only=True)
    receiver = UserInformationSerializer(read_only=True)
    message_set = MessageListSerializer(many=True)

    class Meta:
        model = Room
        fields = ['id', 'initiator', 'receiver', 'message_set']


class NotificationsSerializers(serializers.ModelSerializer):
    message = ConversationListSerializer(read_only=True)

    class Meta:
        model = NotificationChat
        fields = ['id', 'user', 'message', 'is_active', 'create_at']