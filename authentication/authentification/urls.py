from django.urls import path
from authentification.views import (
    UserSignUp,
    UserSignIn,
    change_password,
    UserLogout,
    RequestPasswordRestEmail,
    SetNewPasswordView,
    SendEmailCode,
    UserProfile,
    GenerateToken,
    CustomTokenObtainPairView,

)

urlpatterns = [
    path('auth/signup', UserSignUp.as_view()),
    path('auth/sigin', UserSignIn.as_view()),
    path('auth/password', change_password),
    path('auth/logout', UserLogout.as_view()),
    path('auth/password/reset', RequestPasswordRestEmail.as_view()),
    path('auth/password/confirm', SetNewPasswordView.as_view()),
    path('auth/verification/email', SendEmailCode.as_view()),
    path('auth/users', UserProfile.as_view()),
    path('generate_token', GenerateToken.as_view()),
    path('api/', CustomTokenObtainPairView.as_view())

]