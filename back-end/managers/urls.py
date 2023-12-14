from django.urls import path
from managers.views import (
    ManagerKitchenViews,
    ManagerUser,
    ManagerKitchenCrudViews,
)

urlpatterns = [
    path('users_post', ManagerKitchenViews.as_view()),
    path('users', ManagerUser.as_view()),
    path('users_crud', ManagerKitchenCrudViews.as_view()),
]
