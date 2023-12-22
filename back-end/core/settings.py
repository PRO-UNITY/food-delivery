from pathlib import Path
from datetime import timedelta
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-p+$#(-kv%f*8b7q^9^)hp7h*jo#1k+q2hcetyws12d1u_hbdfi"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["*"]


# Application definition

INSTALLED_APPS = [
    "import_export",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Django rest
    "rest_framework",
    "django_filters",
    "corsheaders",
    "rest_framework_simplejwt",
    "rest_framework_simplejwt.token_blacklist",
    "django_rest_passwordreset",
    'drf_spectacular',
    'drf_yasg',
    'cacheops',
    # my_app
    "authen",
    "kitchen",
    "foods",
    'managers',
    'order',
    'deliveryman',
    # socaill apps
    "django.contrib.sites",
    "dj_rest_auth",
    "social_django",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "allauth.socialaccount.providers.google",
    "allauth.socialaccount.providers.github",
    "allauth.socialaccount.providers.facebook",
    "rest_framework.authtoken",
    "dj_rest_auth.registration",
]

SITE_ID = 1

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "allauth.account.middleware.AccountMiddleware",
    "core.cashe.CacheControlMiddleware"
]

ROOT_URLCONF = "core.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "templates")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "core.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": 'food_delivery',
        "USER": "postgres",
        "PASSWORD": "1",
        "HOST": "127.0.0.1",
        "PORT": "5432",
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

STATICFILES_DIRS = [os.path.join(BASE_DIR, "static")]
STATIC_URL = "static/"
STATIC_ROOT = os.path.join(BASE_DIR, "static_cdn")

MEDIA_URL = "/food-delivery/media/"

MEDIA_ROOT = os.path.join(BASE_DIR, "media")
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"


# Default primary key field type
# https://docs.djangoproject.com/en/4.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
AUTHENTICATION_CLASSES = ("dj_rest_auth.authentication.AllAuthJWTAuthentication",)

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
        "rest_framework.authentication.SessionAuthentication",
        "rest_framework.authentication.BasicAuthentication",
    ),
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "NON_FIELD_ERRORS_KEY": "errors",
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.LimitOffsetPagination",
}

# access_token_lifetime_days = int(os.environ.get('ACCESS_TOKEN_LIFETIME_DAYS'))
# refresh_token_lifetime_days = int(os.environ.get('REFRESH_TOKEN_LIFETIME_DAYS'))

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=7),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "AUTH_HEADER_TYPES": ("Bearer", "Token"),
    "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
    "USER_AUTHENTICATION_RULE": "rest_framework_simplejwt.authentication.default_user_authentication_rule",
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    "TOKEN_TYPE_CLAIM": "token_type",
    "TOKEN_USER_CLASS": "rest_framework_simplejwt.models.TokenUser",
    "JTI_CLAIM": "jti",
}

CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True


# cors
CORS_ALLOWED_ORIGINS = [
    "https://food-delivery.prounity.uz",
    "http://localhost:3000",
    "http://localhost:5174",
    "http://localhost:5173",
]

CHANNEL_LAYERS = {"default": {"BACKEND": "channels.layers.InMemoryChannelLayer"}}

SWAGGER_SETTINGS = {
    "SECURITY_DEFINITIONS": {
        "JWT [Bearer {JWT}]": {
            "name": "Authorization",
            "type": "apiKey",
            "in": "header",
        }
    },
    "TITLE": "Food delivery",
    "DESCRIPTION": "Food Delivery back-end",
    "VERSION": "0.1.0",
    "USE_SESSION_AUTH": False,
}
SPECTACULAR_SETTINGS = {
    "TITLE": "Food-delivery API",
    "DESCRIPTION": "Food-delivery back-end",
    "VERSION": "0.1.0",
}
AUTH_USER_MODEL = "authen.CustomUser"


# Email Backend Configuration
EMAIL_BACKEND = (
    # Replace with your preferred backend
    "django.core.mail.backends.smtp.EmailBackend"
)

EMAIL_HOST = "smtp.gmail.com"
EMAIL_HOST_USER = "istamovibrohim8@gmail.com"
EMAIL_HOST_PASSWORD = "xuaokkmfmsaxbdyu"
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_TIMEOUT = 300
DEFAULT_FROM_EMAIL = "unipointsoftwaredevelopment@gmail.com"

SOCIALACCOUNT_PROVIDERS = {
    "facebook": {
        "APP": {
            "client_id": "863244545502688",
            "secret": "8d9a789122fc5f51ab48d03831412c45",
        }
    },
}

AUTHENTICATION_BACKENDS = [
    "social_core.backends.facebook.FacebookOAuth2",
    "allauth.account.auth_backends.AuthenticationBackend",
    # ...
]

REST_USE_JWT = True
JWT_AUTH = {
    "JWT_RESPONSE_PAYLOAD_HANDLER": "authentification.utils.jwt_response_payload_handler",
}

SIMPLE_JWT = {
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
}

CACHEOPS = {
    'auth.user': {'ops': 'get', 'timeout': 60*15},
    'authen.*': {'ops': 'all', 'timeout': 60*15},
    'foods.*': {'ops': 'all', 'timeout': 60*15},
    'kitchen.*': {'ops': 'all', 'timeout': 60*15},
    'order.*': {'ops': 'all', 'timeout': 60*15},
    'manager.*': {'ops': 'all', 'timeout': 60*15},
    'deliveryman.*': {'ops': 'all', 'timeout': 60*15},
}

CACHE_TIMEOUT = 60 * 15  # 15 minutes

SOCIAL_AUTH_FACEBOOK_KEY = "863244545502688"
SOCIAL_AUTH_FACEBOOK_SECRET = "8d9a789122fc5f51ab48d03831412c45"
SOCIAL_AUTH_FACEBOOK_APP_NAME = "facebook"

FORCE_SCRIPT_NAME = "/food-delivery"
