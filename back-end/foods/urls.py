from django.urls import path
from foods.views import (
    AllCategoriesViews,
    CategoriesCrudViews,
    CategoriesKitchenViews,
    AllFoodsViews,
    CategoriesFoodsViews,
    KitchenFoodsViews,
    FoodsCrudViews,
)

urlpatterns = [
    path('all_categories', AllCategoriesViews.as_view()),
    path('categories_kitchen/<int:pk>', CategoriesKitchenViews.as_view()),
    path('categories_crud/<int:pk>', CategoriesCrudViews.as_view()),
    path('all_foods', AllFoodsViews.as_view()),
    path('categories_foods/<int:pk>', CategoriesFoodsViews.as_view()),
    path('kitchen_foods_views/<int:pk>', KitchenFoodsViews.as_view()),
    path('foods_crud/<int:pk>', FoodsCrudViews.as_view()),
]
