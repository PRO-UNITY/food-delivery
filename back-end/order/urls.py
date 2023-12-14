from django.urls import path
from order.views import (
    SendViews
)

urlpatterns = [
    path('', SendViews.as_view()),
]
