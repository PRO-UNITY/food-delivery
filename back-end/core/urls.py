from django.contrib import admin
from django.urls import path, include, re_path
from django.views.static import serve
from django.conf.urls.static import static
from django.conf import settings
from rest_framework_simplejwt import views as jwt_views
from django.views.generic import TemplateView
from rest_framework_simplejwt.views import TokenBlacklistView
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

admin.site.site_url = None

schema_view = get_schema_view(
   openapi.Info(
      title="Food-delivery API",
      default_version='v1',
      description="Food-Delivery",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="istamovibrohim8@gmail.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)
urlpatterns = [
    path('swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path(
        "docs/",
        TemplateView.as_view(
            template_name="doc.html", extra_context={"schema_url": "api_schema"}
        ),
        name="swagger-ui",
    ),
    path('redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
    path("schema/", SpectacularAPIView.as_view(), name="schema"),
    # Socaill urls:
    path("accounts/", include("allauth.urls")),
    path("accounts/", include("allauth.socialaccount.urls")),
    path("auth_social/", include("dj_rest_auth.urls")),
    path("auth_social/registration/", include("dj_rest_auth.registration.urls")),
    path("auth/", include("authen.urls")),
    path("admin/", admin.site.urls),
    path(
        "token/",
        jwt_views.TokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),
    path(
        "token/refresh/",
        jwt_views.TokenRefreshView.as_view(),
        name="token_refresh",
    ),
    path('logout/', TokenBlacklistView.as_view(), name='token_blacklist'),
    path(
        "password_reset/",
        include("django_rest_passwordreset.urls", namespace="password_reset"),
    ),
    path("kitchen/", include("kitchen.urls")),
    path('foods/', include('foods.urls')),
    path('apps/', include('apps.urls')),
    path('delivery/', include('delivery.urls')),
]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += [
    re_path(
        r"^media/(?P<path>.*)$",
        serve,
        {
            "document_root": settings.MEDIA_ROOT,
        },
    ),
]
