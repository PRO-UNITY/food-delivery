from django.urls import path
from delivery.delivery_user import (
    RegisterDeliveryViews,
    DeliveryUser,
    DeliveryUserCrud
)
from delivery.views import (
    StatusDeliveryViews,
    GradeDeliveryViews,
    DeliveryKitchenCreateViews,
    ActiveOrderView,
    AcceptanceOrderDeliveryViews,
    ActiveDeliveryView,
    ActiveDeliveryDeteileView,
    DeliveryAcceptView,
    DeliveryNoAcceptView,
    UserActiveOrderView,
    UserAcceptOrderView,
    DeteileOrderViews,
    OrderCommnetViews,
)

urlpatterns = [
    path('users_post', RegisterDeliveryViews.as_view()),
    path('users', DeliveryUser.as_view()),
    path('users_crud', DeliveryUserCrud.as_view()),
    path('status', StatusDeliveryViews.as_view()),
    path('rating', GradeDeliveryViews.as_view()),
    path(
        'create_kitchen_delivery/<int:pk>',
        DeliveryKitchenCreateViews.as_view()),
    path('acceptance_order/<int:pk>', AcceptanceOrderDeliveryViews.as_view()),
    path('active_order', ActiveOrderView.as_view()),
    path('active_delivery', ActiveDeliveryView.as_view()),
    path('active_delivery_details/<int:pk>', ActiveDeliveryDeteileView.as_view()),
    path('accepted_delivery', DeliveryAcceptView.as_view()),
    path('no_accept_delivery', DeliveryNoAcceptView.as_view()),
    path('user_active_order', UserActiveOrderView.as_view()),
    path('user_accept_order', UserAcceptOrderView.as_view()),
    path('deteile_order/<int:pk>', DeteileOrderViews.as_view()),
    path('order_commnet', OrderCommnetViews.as_view()),
]
