from django.urls import path
from order.views import (
    SendViews,
    OrderView,
    OrderHistoryKitchenView,
    OrderHistoryuserView,
)
from order.order_delivery  import (
    OrderHistoryDeliveryView,
    OrderDeliveryView,
    OrderActiveDeliveryView,
    OrderAcceptDeliveryView,
)
from order.order_manager import (
    OrderActiveManagerView,
    OrderAcceptManagerView,
    OrderHistoryManagerView
)

urlpatterns = [
    path('orders', SendViews.as_view()),
    path('order/<int:pk>/foods', OrderView.as_view()),
    path('order/kitchen/history', OrderHistoryKitchenView.as_view()),
    path('order/history/user', OrderHistoryuserView.as_view()),
    path('order/history/delivery', OrderHistoryDeliveryView.as_view()),
    path('order/delivery', OrderDeliveryView.as_view()),
    path('order/delivery/active', OrderActiveDeliveryView.as_view()),
    path('order/<int:pk>/delivery/accept', OrderAcceptDeliveryView.as_view()),
    path('order/manager/history', OrderHistoryManagerView.as_view()),
    path('order/manager/active', OrderActiveManagerView.as_view()),
    path('order/<int:pk>/manager/accept', OrderAcceptManagerView.as_view()),
]
