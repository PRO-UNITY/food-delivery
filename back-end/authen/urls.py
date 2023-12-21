from django.urls import path
from authen.views.social_views import GoogleView, FacebookLogin
from authen.views.authen_views import (
    UserRegisterViews,
    UserSigInViews,
    change_password,
    LogoutAPIView,
    RequestPasswordRestEmail,
    SetNewPasswordView,
    SendEmailCode,

)

urlpatterns = [
    path('signup', UserRegisterViews.as_view()),
    path('sigin', UserSigInViews.as_view()),
    path('password', change_password),
    path('logout', LogoutAPIView.as_view()),
    path(
        'password/reset',
        RequestPasswordRestEmail.as_view()),
    path('password/confirm', SetNewPasswordView.as_view()),
    path('verification/email', SendEmailCode.as_view()),
    # social views
    path('socail/google', GoogleView.as_view()),
    path('socail/facebook', FacebookLogin.as_view()),
]
