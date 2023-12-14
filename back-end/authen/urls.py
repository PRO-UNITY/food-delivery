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
    RequestPasswordRestEmail,
    SetNewPasswordView

)

urlpatterns = [
    path('signup', UserRegisterViews.as_view()),
    path('kitchen_register', KitchenRegisterViews.as_view()),
    path('sigin', UserSigInViews.as_view()),
    path('send_email_code', SendEmailCode.as_view()),
    path('profiles', UserProfilesViews.as_view()),
    path('update', UserUpdateView.as_view()),
    path('change_password', change_password),
    path('details/<int:pk>', UserDeteilseViews.as_view()),
    # social views
    path('socail/google', GoogleView.as_view()),
    path('socail/facebook', FacebookLogin.as_view()),
    path('socail/facebook_token_view', FacebookTokenView.as_view()),
    path('logout', LogoutAPIView.as_view()),
    path(
        'forget_password/request_password_rest_email',
        RequestPasswordRestEmail.as_view()),
    # path('password/password_token_check', PasswordTokenCheckView.as_view()),
    path('forget_password/set_new_password', SetNewPasswordView.as_view()),
]
