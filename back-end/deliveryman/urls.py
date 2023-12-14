from django.urls import path
from deliveryman.views import (
    RegisterDeliveryViews,
    DeliveryUser,
    DeliveryUserCrud
)


urlpatterns = [
    path('', RegisterDeliveryViews.as_view()),
    path('', DeliveryUser.as_view()),
    path('<int:pk>', DeliveryUserCrud.as_view()),

]
