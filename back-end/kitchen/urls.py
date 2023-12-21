from django.urls import path
from kitchen.views import (
    KitchenCreateViews,
    KitchenCrudViews,
    CategoriesKitchenViews,
    CategoriesCrudViews,
    KitchenCategoryViews,
    KitchenFoodsViews,
    AllKitchenFood,
)

urlpatterns = [
    path("", KitchenCreateViews.as_view()),
    path("<int:pk>", KitchenCrudViews.as_view()),
    path('<int:pk>/categories', KitchenCategoryViews.as_view()),
    path('category', CategoriesKitchenViews.as_view()),
    path('category/<int:pk>', CategoriesCrudViews.as_view()),
    path("foods", KitchenFoodsViews.as_view()),
    path("<int:pk>/foods", AllKitchenFood.as_view()),
]
