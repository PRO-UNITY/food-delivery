from django.urls import path
from kitchen.views import (
    KitchenCreateViews,
    KitchenCrudViews,
    AllKitchenViews,
    KitchenFoodsViews,
    KitchenFoodsCrudViews,
    AllKitchenFood,
    DeteileKitchenFood,
)

urlpatterns = [
    path("kitchen_create", KitchenCreateViews.as_view()),
    path("kitchen_crud<int:pk>", KitchenCrudViews.as_view()),
    path('all_kitchen', AllKitchenViews.as_view()),
    path("kitchen_foods", KitchenFoodsViews.as_view()),
    path("kitchen_foods_crud<int:pk>", KitchenFoodsCrudViews.as_view()),
    path("all_kitchen_foods", AllKitchenFood.as_view()),
    path("deteile_kitchen_food<int:pk>", DeteileKitchenFood.as_view()),
]
