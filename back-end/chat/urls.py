from django.urls import path
from chat.views import (
    RoomsViews,
    StartConversationView,
    ConversationView,
    DeleteChatSMSView,
    NewMessages,
    NewMessagesDeteile,

)

urlpatterns = [
    path('', ConversationView.as_view()),
    path('new/messages', NewMessages.as_view()),
    path('new/messages/<int:pk>', NewMessagesDeteile.as_view()),
    path('create_room', StartConversationView.as_view()),
    path('rooms/<int:pk>', RoomsViews.as_view()),
    path('message_delete/<int:pk>', DeleteChatSMSView.as_view()),

]
