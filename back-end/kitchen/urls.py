from django.urls import path
from kitchen.views.kitchen import (
    KitchensView,
    KitchenView,
    KitchenAddDeliverymanView,
    KitchenAddManagerView,
)
from kitchen.views.kitchen_foods import (
    KitchenFoodsView,
    KitchenFoodView,
    KitchenCategoryFoodsView,
)
from kitchen.views.food_category import (
    KitchenCategoryView,
    FoodCategoriesView,
    FoodCategoryView
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
    path('deliveryman/add/<int:pk>', KitchenAddDeliverymanView.as_view()),
    path('manager/add/<int:pk>', KitchenAddManagerView.as_view()),

]
