from django.urls import path
from kitchen.views import (
    KitchenCreateViews,
    KitchenCrudViews,
    CategoriesKitchenViews,
    CategoriesCrudViews,
    AllKitchenViews,
    KitchenFoodsViews,
    KitchenFoodsCrudViews,
    AllKitchenFood,
    DeteileKitchenFood,
    KitchenLikeViews,
    KitchenCategoriesViews,
    KitchenIsActiveViews,
    ManagerKitchenCreateViews,
)

urlpatterns = [
    path("", KitchenCreateViews.as_view()),
    path("<int:pk>", KitchenCrudViews.as_view()),
    path('categories', CategoriesKitchenViews.as_view()),
    path('<int:pk>/catgeories', CategoriesCrudViews.as_view()),
    # path("kitchen_all", AllKitchenViews.as_view()),
    # path("kitchen_foods", KitchenFoodsViews.as_view()),
    # path("kitchen_foods_crud/<int:pk>", KitchenFoodsCrudViews.as_view()),
    path("foods/<int:pk>", AllKitchenFood.as_view()),
    # path("deteile_kitchen_food/<int:pk>", DeteileKitchenFood.as_view()),
    # path("kitchen_like/<int:pk>", KitchenLikeViews.as_view()),
    # path("category/<int:pk>", KitchenCategoriesViews.as_view()),
    # path("kitchen_is_active", KitchenIsActiveViews.as_view()),
    # path('add_manager/<int:pk>', ManagerKitchenCreateViews.as_view()),
]
