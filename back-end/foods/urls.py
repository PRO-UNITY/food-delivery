from django.urls import path
from foods.views import (
    AllFoodsViews,
    FoodsCrudViews,
    CategoriesFoodsViews,
)

urlpatterns = [
    path('', AllFoodsViews.as_view()),
    path('<int:pk>', FoodsCrudViews.as_view()),
    path('category/<int:pk>', CategoriesFoodsViews.as_view()),
]
