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
    path('user/signup', UserRegisterViews.as_view()),
    path('user/kitchen_register', KitchenRegisterViews.as_view()),
    path('user/sigin', UserSigInViews.as_view()),
    path('user/send_email_code', SendEmailCode.as_view()),
    path('user/profiles', UserProfilesViews.as_view()),
    path('user/update', UserUpdateView.as_view()),
    path('user/change_password', change_password),
    path('user/details/<int:pk>', UserDeteilseViews.as_view()),
    path('user/register_delivery', RegisterDeliveryViews.as_view()),
    path('user/delivery_user', DeliveryUser.as_view()),
    path('user/delivery_user_crud/<int:pk>', DeliveryUserCrud.as_view()),
    path('user/create_manager', ManagerKitchenViews.as_view()),
    path('user/manager_user', ManagerUser.as_view()),
    path('user/manager_kitchen_create/<int:pk>', ManagerKitchenCreateViews.as_view()),
    path('user/manager_kitchen_crud/<int:pk>', ManagerKitchenCrudViews.as_view()),
    # social views
    path('socail/google', GoogleView.as_view()),
    path('socail/facebook', FacebookLogin.as_view()),
    path('socail/facebook_token_view', FacebookTokenView.as_view()),
    path('user/logout', LogoutAPIView.as_view()),
    path('password/request_password_rest_email', RequestPasswordRestEmail.as_view()),
    # path('password/password_token_check', PasswordTokenCheckView.as_view()),
    path('password/set_new_password', SetNewPasswordView.as_view()),
]
