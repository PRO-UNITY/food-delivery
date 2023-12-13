from django.urls import path
from authen.views.social_views import GoogleView, FacebookLogin, FacebookTokenView
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
    RequestPasswordRestEmail,
    PasswordTokenCheckView,
    SetNewPasswordView

)

urlpatterns = [
    path('user_signup', UserRegisterViews.as_view()),
    path('kitchen_register', KitchenRegisterViews.as_view()),
    path('user_sigin', UserSigInViews.as_view()),
    path('send_email_code', SendEmailCode.as_view()),
    path('user_profiles', UserProfilesViews.as_view()),
    path('user_update', UserUpdateView.as_view()),
    path('change_password', change_password),
    path('user_details/<int:pk>', UserDeteilseViews.as_view()),
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
    path('FacebookTokenView/', FacebookTokenView.as_view()),
    path('logout', LogoutAPIView.as_view()),
    path('request_password_rest_email', RequestPasswordRestEmail.as_view()),
    path('password_token_check', PasswordTokenCheckView.as_view()),
    path('set_new_password', SetNewPasswordView.as_view()),
]
