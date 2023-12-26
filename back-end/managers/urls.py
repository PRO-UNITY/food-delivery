from django.urls import path
from managers.views import (
    ManagersView,
    ManagerView,
    ManagerKitchensViews,
)

urlpatterns = [
    path('managers', ManagersView.as_view()),
    path('manager/<int:pk>', ManagerView.as_view()),
    path('manager/restaurants', ManagerKitchensViews.as_view()),
]
