from django.urls import path
from foods.views import (
    AllFoodsViews,
    FoodsCrudViews,
    CategoriesFoodsViews,
    FavoriteViews,
    FavoriteDeleteViews,
)

urlpatterns = [
    path("", AllFoodsViews.as_view()),
    path("<int:pk>", FoodsCrudViews.as_view()),
    path("category/<int:pk>", CategoriesFoodsViews.as_view()),
    path("favorites", FavoriteViews.as_view()),
    path("favorite/<int:pk>", FavoriteDeleteViews.as_view()),
]
