from django.contrib import admin
from django.urls import path, include, re_path
from django.views.static import serve
from django.conf.urls.static import static
from django.conf import settings
from rest_framework_simplejwt import views as jwt_views
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from authen.views.authen_views import UserProfile

admin.site.site_url = None

schema_view = get_schema_view(
   openapi.Info(
      title="Food-delivery API",
      default_version='v1',
      description="Food-Delivery",
      terms_of_service="https://api.prounity.uz/food-delivery/docs/",
      contact=openapi.Contact(email="istamovibrohim8@gmail.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)
urlpatterns = [
   # path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
   path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
   path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
   path("auth/", include("authen.urls")),
   path("admin/", admin.site.urls),
   path('user', UserProfile.as_view()),
   path("kitchen/", include("kitchen.urls")),
   path('foods/', include('foods.urls')),
   path('', include('managers.urls')),
   path('', include('order.urls')),
   path('user/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
   path('deliveryman/', include('deliveryman.urls')),
   path('chat/', include('chat.urls')),
]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += [re_path(r"^media/(?P<path>.*)$", serve, {"document_root": settings.MEDIA_ROOT,},),]
