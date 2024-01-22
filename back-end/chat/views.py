from drf_spectacular.utils import extend_schema
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.db.models import Q
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from drf_yasg.utils import swagger_auto_schema
from authen.renderers import UserRenderers
from authen.models import CustomUser
from chat.models import Room, Message
from chat.serializers import MessageListSerializer, ConversationSerializer, MessageSerializer, ConversationListSerializer
from utils.pagination import *


class StartConversationView(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def post(self, request):
        if not request.user.is_authenticated:
            return Response({'error': 'Invalid Token'}, status=status.HTTP_401_UNAUTHORIZED)
        data = request.data
        username = data['username']
        try:
            participant = CustomUser.objects.get(username=username)
        except User.DoesNotExist:
            return Response({'message': 'You cannot chat with a non existent user'})
        conversation = Room.objects.filter(Q(initiator=request.user, receiver=participant) | Q(initiator=participant, receiver=request.user))
        if conversation.exists():
            return Response({"message": "Conversation already exists"}, status=status.HTTP_200_OK)
        else:
            conversation = Room.objects.create(initiator=request.user, receiver=participant)
            return Response(ConversationSerializer(instance=conversation).data, status=status.HTTP_200_OK)


class RoomsViews(APIView,  Pagination):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["text"]

    def get(self, request, pk):
        if not request.user.is_authenticated:
            return Response({'error': 'Invalid Token'}, status=status.HTTP_401_UNAUTHORIZED)
        text = request.query_params.get("text", None)
        if text:
            conversation = Message.objects.select_related('conversation_id').filter(Q(conversation_id=pk), Q(text__icontains=text))
            serializer = MessageListSerializer(conversation, many=True, context={'request': request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        conversation = get_object_or_404(Room, id=pk)
        # messages = conversation.message_set.all() 
        serializer = ConversationSerializer(conversation,  context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(request_body=MessageSerializer)
    def put(self, request, pk):
        if not request.user.is_authenticated:
            return Response({'error': 'Invalid Token'}, status=status.HTTP_401_UNAUTHORIZED)
        conversation = get_object_or_404(Room, id=pk)
        serializer = MessageSerializer(data=request.data, context={"request": request, "conversation": conversation})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ConversationView(APIView):
    render_classes = [UserRenderers]
    pagination_class = StandardResultsSetPagination

    def get(self, request):
        if not request.user.is_authenticated:
            return Response({'error': 'Invalid Token'}, status=status.HTTP_401_UNAUTHORIZED)
        conversation_list = Room.objects.filter(Q(initiator=request.user) | Q(receiver=request.user)).order_by('-id')
        serializer = ConversationListSerializer(instance=conversation_list, many=True)
        # serializer = super().page(conversation_list, ConversationListSerializer, request)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DeleteChatSMSView(APIView):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    def delete(self, request, pk):
        if not request.user.is_authenticated:
            return Response({'error': 'Invalid Token'}, status=status.HTTP_401_UNAUTHORIZED)
        queryset = get_object_or_404(Message, id=pk).delete()
        return Response({'msg': "Message Deleted successfully"}, status=status.HTTP_200_OK)