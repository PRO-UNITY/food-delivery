from django.urls import path
from order.views import (
    SendViews,
    OrderView,
)

urlpatterns = [
    path('orders', SendViews.as_view()),
    path('order/<int:pk>/foods', OrderView.as_view()),
]
