from django.contrib import admin
from recipe.models import (
    FoodCategories,
    Foods,
    FoodFiles
)

admin.site.register(FoodCategories)
admin.site.register(Foods)
admin.site.register(FoodFiles)
