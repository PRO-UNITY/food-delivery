from django.urls import path
from authen.views.social_views import GoogleView
from authen.views.authen_views import (
    UserGenderViews,
    UserRegisterViews,
    UserSigInViews,
    SendEmailCode,
    UserProfilesViews,
    UserUpdateView,
    change_password,

)

urlpatterns = [
    path('user_gender_views/', UserGenderViews.as_view()),
    path('user_signup_views/', UserRegisterViews.as_view()),
    path('user_sigin_views/', UserSigInViews.as_view()),
    path('send_email_code/', SendEmailCode.as_view()),
    path('user_profiles_views/', UserProfilesViews.as_view()),
    path('user_update_view/', UserUpdateView.as_view()),
    path('change_password/', change_password),
    # social views
    path('google/login/', GoogleView.as_view())
]
