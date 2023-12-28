from django.urls import path
from foods.views.foods_views import (
    FoodsView,
    FoodViews,
)
from foods.views.favourite_views import (
    FoodCategories,
    FavouritesView,
    FavouriteViews,
)


urlpatterns = [
    path("", FoodsView.as_view()),
    path("<int:pk>", FoodViews.as_view()),
    path("category/<int:pk>", FoodCategories.as_view()),
    path("favourites", FavouritesView.as_view()),
    path("favourite/<int:pk>", FavouriteViews.as_view()),
]
