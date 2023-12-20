from django.urls import path
from order.views import (
    SendViews,
    OrderCrudViews,
)

urlpatterns = [
    path('orders', SendViews.as_view()),
    path('order/<int:pk>/foods', OrderCrudViews.as_view()),
]
