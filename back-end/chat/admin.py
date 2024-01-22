from django.contrib import admin
from chat.models import Room, Message, NotificationChat

admin.site.register(Room)
admin.site.register(Message)
admin.site.register(NotificationChat)
