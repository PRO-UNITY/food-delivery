from django.urls import path
from order.views import (
    SendViews,
    OrderView,
    OrderHistoryKitchenView,
    OrderHistoryuserView,
)

urlpatterns = [
    path('orders', SendViews.as_view()),
    path('order/<int:pk>/foods', OrderView.as_view()),
    path('order/kitchen/history', OrderHistoryKitchenView.as_view()),
    path('order/history/user', OrderHistoryuserView.as_view()),
]
