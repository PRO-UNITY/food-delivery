from django.contrib import admin
from order.models import OrderStatus, Orders

admin.site.register(OrderStatus)
admin.site.register(Orders)
