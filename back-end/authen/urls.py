from django.urls import path
from authen.views.social_views import GoogleView, FacebookLogin
from authen.views.authen_views import (
    UserRegisterViews,
    KitchenRegisterViews,
    UserSigInViews,
    SendEmailCode,
    UserProfilesViews,
    UserUpdateView,
    change_password,
    UserDeteilseViews,
    LogoutAPIView,
    RegisterDeliveryViews,
    DeliveryUser,
    DeliveryUserCrud,
    ManagerKitchenViews,
    ManagerUser,
    ManagerKitchenCreateViews,
    ManagerKitchenCrudViews,

)

urlpatterns = [
    path('user_signup', UserRegisterViews.as_view()),
    path('kitchen_register', KitchenRegisterViews.as_view()),
    path('user_sigin', UserSigInViews.as_view()),
    path('send_email_code', SendEmailCode.as_view()),
    path('user_profiles', UserProfilesViews.as_view()),
    path('user_update_view', UserUpdateView.as_view()),
    path('change_password', change_password),
    path('user_deteilse_views/<int:pk>', UserDeteilseViews.as_view()),
    path('register_delivery', RegisterDeliveryViews.as_view()),
    path('delivery_user', DeliveryUser.as_view()),
    path('delivery_user_crud/<int:pk>', DeliveryUserCrud.as_view()),
    path('create_manager', ManagerKitchenViews.as_view()),
    path('manager_user', ManagerUser.as_view()),
    path('manager_kitchen_create/<int:pk>', ManagerKitchenCreateViews.as_view()),
    path('manager_kitchen_crud/<int:pk>', ManagerKitchenCrudViews.as_view()),
    # social views
    path('google/login', GoogleView.as_view()),
    path('facebook/login', FacebookLogin.as_view()),
    path('logout', LogoutAPIView.as_view()),
]
