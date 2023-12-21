from django.urls import path
from kitchen.views import (
    KitchenViews,
    KitchenDetileViews,
    KitchenCategoryFoodsViews,
    KitchenCategoryViews,
    CategoryDeteileViews,
    KitchenFoodsViews,
    KitchenFoods,
    KitchenCategoryFoodViews,
)

urlpatterns = [
    path("", KitchenViews.as_view()),
    path("<int:pk>", KitchenDetileViews.as_view()),
    path('<int:pk>/categories', KitchenCategoryFoodsViews.as_view()),
    path('category', KitchenCategoryViews.as_view()),
    path('category/<int:pk>', CategoryDeteileViews.as_view()),
    path("foods", KitchenFoodsViews.as_view()),
    path("<int:pk>/foods", KitchenFoods.as_view()),
    path("category/<int:id_category>/food/<int:pk>", KitchenCategoryFoodViews.as_view()),
]
