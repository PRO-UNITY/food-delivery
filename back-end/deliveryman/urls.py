from django.urls import path
from deliveryman.views import (
    RegisterDelivery,
    UserDelivery,
    DeliveryAddKitchen,
)


urlpatterns = [
    path('', RegisterDelivery.as_view()),
    path('<int:pk>', UserDelivery.as_view()),
    path('kitchen/add', DeliveryAddKitchen.as_view()),

]
