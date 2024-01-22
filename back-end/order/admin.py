from django.contrib import admin
from order.models import OrderStatus, Orders, OrderNotification


admin.site.register(OrderStatus)
admin.site.register(Orders)
admin.site.register(OrderNotification)