from django.urls import path
from managers.views import (
    ManagerKitchenViews,
    # ManagerUser,
    ManagerKitchenCrudViews,
)

urlpatterns = [
    path('managers', ManagerKitchenViews.as_view()),
    path('manager/<int:pk>', ManagerKitchenCrudViews.as_view()),
    # path('', ManagerUser.as_view()),
]
