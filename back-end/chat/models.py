from django.db import models
from authen.models import CustomUser
from kitchen.models import Restaurants


class Room(models.Model):
    initiator = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, related_name='convo_starter')
    receiver = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, related_name='convo_participant')
    restaruant = models.ForeignKey(Restaurants, on_delete=models.CASCADE, null=True, blank=True)
    start_time = models.DateTimeField(auto_now_add=True, verbose_name='Time stamp', null=True, blank=True)

    class Meta:
        db_table = "table_room"
        verbose_name = "Room"
        verbose_name_plural = "Room"


class Message(models.Model):
      sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True, related_name='message_sender')
      text = models.CharField(max_length=200, blank=True, verbose_name='Text')
      attachment = models.FileField(blank=True, null=True, verbose_name='File Uploaded')
      conversation_id = models.ForeignKey(Room, on_delete=models.CASCADE, verbose_name='Conversation Identity', null=True, blank=True)
      timestamp = models.DateTimeField(auto_now_add=True, verbose_name='Time stamp', null=True, blank=True)

      class Meta:
            ordering = ('-timestamp',)
            db_table = "table_Message"
            verbose_name = "Message"
            verbose_name_plural = "Message"


class NotificationChat(models.Model):
     user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
     message = models.ForeignKey(Room, on_delete=models.CASCADE)
     is_active = models.BooleanField(default=False)
     create_at = models.DateTimeField(auto_now_add=True)
