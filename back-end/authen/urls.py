from django.urls import path
from authen.views.social_views import GoogleView, FacebookLogin
from authen.views.authen_views import (
    UserSignUp,
    UserSignIn,
    change_password,
    UserLogout,
    RequestPasswordRestEmail,
    SetNewPasswordView,
    VerificationSmsCodeView,
    ResendCodeByEmailView,

)

urlpatterns = [
    path('signup', UserSignUp.as_view()),
    path('sigin', UserSignIn.as_view()),
    path('password', change_password),
    path('logout', UserLogout.as_view()),
    path('password/reset', RequestPasswordRestEmail.as_view()),
    path('password/confirm', SetNewPasswordView.as_view()),
    path('verification/email', VerificationSmsCodeView.as_view()),
    path('socail/google', GoogleView.as_view()),
    path('socail/facebook', FacebookLogin.as_view()),
    path('resend', ResendCodeByEmailView.as_view()),
]
