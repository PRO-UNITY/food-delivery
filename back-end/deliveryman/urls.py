from django.urls import path
from deliveryman.views import (
    RegisterDeliveryViews,
    DeliveryUserCrud
)


urlpatterns = [
    path('', RegisterDeliveryViews.as_view()),
    path('<int:pk>', DeliveryUserCrud.as_view()),

]
