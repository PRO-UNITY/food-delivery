from django.urls import path
from recipe.views import (
    FoodCategoriesAllViews,
    FoodCategoriesCrudViews,
    MyPostFoodAllViews,
    UserFoodAllViews,
    FoodAllViews,
    FoodsCrudViews,
    FoodFilesCrudViews
)

urlpatterns = [
    path('food_categories_all_views/', FoodCategoriesAllViews.as_view()),
    path('food_categories_crud_views/<int:pk>/', FoodCategoriesCrudViews.as_view()),
    path('my_post_food_views/', MyPostFoodAllViews.as_view()),
    path('user_food_all_views/<int:pk>/', UserFoodAllViews.as_view()),
    path('food_all_views/', FoodAllViews.as_view()),
    path('foods_crud_views/<int:pk>/', FoodsCrudViews.as_view()),
    path('food_files_crud_views/<int:pk>/', FoodFilesCrudViews.as_view()),

]
