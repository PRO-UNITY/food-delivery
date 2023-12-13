from django.urls import path
from foods.views import (
    AllCategoryViews,
    CategoriesCrudViews,
    CategoriesKitchenViews,
    AllFoodsViews,
    CategoriesFoodsViews,
    KitchenFoodsViews,
    FoodsCrudViews,
)

urlpatterns = [
    path('all_category', AllCategoryViews.as_view()),
    path('category_kitchen/<int:pk>', CategoriesKitchenViews.as_view()),
    path('category_crud/<int:pk>', CategoriesCrudViews.as_view()),
    path('all_foods', AllFoodsViews.as_view()),
    path('category_foods/<int:pk>', CategoriesFoodsViews.as_view()),
    path('kitchen_foods_views/<int:pk>', KitchenFoodsViews.as_view()),
    path('foods_crud/<int:pk>', FoodsCrudViews.as_view()),
]
