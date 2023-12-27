from django.urls import path
from deliveryman.views import (
    RegisterDelivery,
    UserDelivery,
)


urlpatterns = [
    path('', RegisterDelivery.as_view()),
    path('<int:pk>', UserDelivery.as_view()),

]
