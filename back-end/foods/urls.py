from django.urls import path
from foods.views import (
    AllFoodsViews,
    FoodsCrudViews,
)

urlpatterns = [
    # path('category/<int:pk>', CategoriesKitchenViews.as_view()),
    # path('category/<int:pk>', CategoriesCrudViews.as_view()),
    path('', AllFoodsViews.as_view()),
    path('<int:pk>', FoodsCrudViews.as_view()),
    # path('category_foods/<int:pk>', CategoriesFoodsViews.as_view()),
    # path('kitchen_foods/<int:pk>', KitchenFoodsViews.as_view()),
]
