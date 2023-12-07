from django.urls import path
from delivery.views import (
    StatusDeliveryViews,
    GradeDeliveryViews,
    DeliveryKirchenCreateViews,
    SendOrderViews,
    ActiveOrderView,
    AcceptanceOrderDeliveryViews,
    ActiveDeliveryView,
    DeliveryAcceptView,
    DeliveryNoAcceptView,
    UserActiveOrderView,
    UserAcceptOrderView,
    DeteileOrderViews,
    OrderCommnetViews,
)

urlpatterns = [
    path('status_delivery', StatusDeliveryViews.as_view()),
    path('grade_delivery', GradeDeliveryViews.as_view()),
    path(
        'create_kitchen_delivery/<int:pk>',
        DeliveryKirchenCreateViews.as_view()),
    path('send_order', SendOrderViews.as_view()),
    path('acceptance_order/<int:pk>', AcceptanceOrderDeliveryViews.as_view()),
    path('active_order', ActiveOrderView.as_view()),
    path('active_delivery', ActiveDeliveryView.as_view()),
    path('accepted_delivery', DeliveryAcceptView.as_view()),
    path('no_accept_delivery', DeliveryNoAcceptView.as_view()),
    path('user_active_order', UserActiveOrderView.as_view()),
    path('user_accept_order', UserAcceptOrderView.as_view()),
    path('deteile_order/<int:pk>', DeteileOrderViews.as_view()),
    path('order_commnet', OrderCommnetViews.as_view()),
]
