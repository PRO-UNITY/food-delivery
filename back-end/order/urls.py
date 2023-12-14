from django.urls import path
from order.views import (
    StatusOrderViews,
    RatingOrderViews,
    SendViews,
    OrderCrudViews,
)

urlpatterns = [
    path('status', StatusOrderViews.as_view()),
    path('rating', RatingOrderViews.as_view()),
    path('', SendViews.as_view()),
    path('<int:pk>', OrderCrudViews.as_view()),
]
