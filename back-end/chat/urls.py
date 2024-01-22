from django.urls import path
from chat.views import (
    RoomsViews,
    StartConversationView,
    ConversationView,
    DeleteChatSMSView,

)

urlpatterns = [
    path('', ConversationView.as_view()),
    path('create_room', StartConversationView.as_view()),
    path('rooms/<int:pk>', RoomsViews.as_view()),
    path('message_delete/<int:pk>', DeleteChatSMSView.as_view()),

]
