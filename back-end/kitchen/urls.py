from django.urls import path
from kitchen.views import (
    KitchenCreateViews,
    KitchenCrudViews,
    CategoriesKitchenViews,
    CategoriesCrudViews,
    KitchenCategoryViews,
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
    path('<int:pk>/categories', KitchenCategoryViews.as_view()),
    path('category', CategoriesKitchenViews.as_view()),
    path('<int:id_kitchen>/category/<int:pk>', CategoriesCrudViews.as_view()),
    # path("kitchen_all", AllKitchenViews.as_view()),
    # path("kitchen_foods", KitchenFoodsViews.as_view()),
    # path("kitchen_foods_crud/<int:pk>", KitchenFoodsCrudViews.as_view()),
    path("<int:pk>/foods", AllKitchenFood.as_view()),
    # path("deteile_kitchen_food/<int:pk>", DeteileKitchenFood.as_view()),
    # path("kitchen_like/<int:pk>", KitchenLikeViews.as_view()),
    # path("category/<int:pk>", KitchenCategoriesViews.as_view()),
    # path("kitchen_is_active", KitchenIsActiveViews.as_view()),
    # path('add_manager/<int:pk>', ManagerKitchenCreateViews.as_view()),
]
