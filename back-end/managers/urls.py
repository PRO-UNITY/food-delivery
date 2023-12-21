from django.urls import path
from managers.views import (
    ManagerKitchenViews,
    ManagerKitchenCrudViews,
    ManagerKitchensViews,
)

urlpatterns = [
    path('managers', ManagerKitchenViews.as_view()),
    path('manager/<int:pk>', ManagerKitchenCrudViews.as_view()),
    path('manager/restaurants', ManagerKitchensViews.as_view()),
]
