from django.urls import path
from deliveryman.views import (
    RegisterDelivery,
    UserDelivery,
    DeliveryActive,
)


urlpatterns = [
    path('', RegisterDelivery.as_view()),
    path('<int:pk>', UserDelivery.as_view()),
    path('active', DeliveryActive.as_view()),

]
