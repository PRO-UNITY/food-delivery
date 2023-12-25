from django.contrib import admin
from foods.models import (
    FoodsCategories,
    Foods,
    Favorite
)

admin.site.register(FoodsCategories)
admin.site.register(Foods)
admin.site.register(Favorite)
