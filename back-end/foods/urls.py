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
    path('category', AllCategoryViews.as_view()),
    path('category_kitchen/<int:pk>', CategoriesKitchenViews.as_view()),
    path('category_crud/<int:pk>', CategoriesCrudViews.as_view()),
    path('', AllFoodsViews.as_view()),
    path('category_foods/<int:pk>', CategoriesFoodsViews.as_view()),
    path('kitchen_foods/<int:pk>', KitchenFoodsViews.as_view()),
    path('<int:pk>', FoodsCrudViews.as_view()),
]
