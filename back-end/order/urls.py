from django.urls import path
from order.views import (
    SendViews,
    OrderCrudViews,
)

urlpatterns = [
    path('', SendViews.as_view()),
    path('<int:pk>', OrderCrudViews.as_view()),
]
