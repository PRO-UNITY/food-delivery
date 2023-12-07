from django.contrib import admin
from delivery.models import StatusDelivery, Delivery, Grade, OrderComent

admin.site.register(StatusDelivery)
admin.site.register(Delivery)
admin.site.register(Grade)
admin.site.register(OrderComent)
