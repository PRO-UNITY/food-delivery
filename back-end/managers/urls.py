from django.urls import path
from managers.views import (
    ManagerKitchenViews,
    ManagerUser,
    ManagerKitchenCrudViews,
)

urlpatterns = [
    # path('', ManagerKitchenViews.as_view()),
    # path('', ManagerUser.as_view()),
    path('<int:pk>', ManagerKitchenCrudViews.as_view()),
]
