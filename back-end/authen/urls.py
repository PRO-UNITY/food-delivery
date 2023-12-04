from django.urls import path
from authen.views.social_views import GoogleView, FacebookLogin
from authen.views.authen_views import (
    UserGenderViews,
    UserRegisterViews,
    KitchenRegisterViews,
    AllKitchenViews,
    UserSigInViews,
    SendEmailCode,
    UserProfilesViews,
    UserUpdateView,
    change_password,
    UserDeteilseViews,

)

urlpatterns = [
    path('user_gender_views/', UserGenderViews.as_view()),
    path('user_signup_views/', UserRegisterViews.as_view()),
    path('kitchen_register_views/', KitchenRegisterViews.as_view()),
    path('all_kitchen_views/', AllKitchenViews.as_view()),
    path('user_sigin_views/', UserSigInViews.as_view()),
    path('send_email_code/', SendEmailCode.as_view()),
    path('user_profiles_views/', UserProfilesViews.as_view()),
    path('user_update_view/', UserUpdateView.as_view()),
    path('change_password/', change_password),
    path('user_deteilse_views/', UserDeteilseViews.as_view()),
    # social views
    path('google/login/', GoogleView.as_view()),
    path('facebook/login/', FacebookLogin.as_view()),
]
