from django.urls import path
from kitchen.views import (
    KitchensView,
    KitchenView,
    KitchenCategoryView,
    FoodCategoriesView,
    FoodCategoryView,
    KitchenFoodsView,
    KitchenFoodView,
    KitchenCategoryFoodsView,
)

urlpatterns = [
    path("", KitchensView.as_view()),
    path("<int:pk>", KitchenView.as_view()),
    path('<int:pk>/categories', KitchenCategoryView.as_view()),
    path('category', FoodCategoriesView.as_view()),
    path('category/<int:pk>', FoodCategoryView.as_view()),
    path("foods", KitchenFoodsView.as_view()),
    path("<int:pk>/foods", KitchenFoodView.as_view()),
    path("category/<int:id_category>/food/<int:pk>", KitchenCategoryFoodsView.as_view()),

]
