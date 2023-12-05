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
    path('user_gender', UserGenderViews.as_view()),
    path('user_signup', UserRegisterViews.as_view()),
    path('kitchen_register', KitchenRegisterViews.as_view()),
    path('all_kitchen', AllKitchenViews.as_view()),
    path('user_sigin', UserSigInViews.as_view()),
    path('send_email_code', SendEmailCode.as_view()),
    path('user_profiles', UserProfilesViews.as_view()),
    path('user_update_view', UserUpdateView.as_view()),
    path('change_password', change_password),
    path('user_deteilse_views/<int:pk>', UserDeteilseViews.as_view()),
    # social views
    path('google/login', GoogleView.as_view()),
    path('facebook/login', FacebookLogin.as_view()),
]
