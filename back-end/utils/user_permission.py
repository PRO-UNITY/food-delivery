from functools import wraps
from rest_framework.response import Response
from rest_framework import status


def check_kitchen_permission(func):
    @wraps(func)
    def wrapper(self, request, *args, **kwargs):
        user = request.user
        if not user.is_authenticated:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED)
        groups = user.groups.all()
        if not groups or groups[0].name != "kitchen":
            return Response({"error": "You are not allowed to use this URL"}, status=status.HTTP_401_UNAUTHORIZED)
        return func(self, request, *args, **kwargs)
    return wrapper


def check_manager_permission(func):
    @wraps(func)
    def wrapper(self, request, *args, **kwargs):
        user = request.user
        if not user.is_authenticated:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED)
        groups = user.groups.all()
        if not groups or groups[0].name != "manager":
            return Response({"error": "You are not allowed to use this URL"}, status=status.HTTP_401_UNAUTHORIZED)
        return func(self, request, *args, **kwargs)
    return wrapper


def check_user_permission(func):
    @wraps(func)
    def wrapper(self, request, *args, **kwargs):
        user = request.user
        if not user.is_authenticated:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED)
        groups = user.groups.all()
        if not groups or groups[0].name != "users":
            return Response({"error": "You are not allowed to use this URL"}, status=status.HTTP_401_UNAUTHORIZED)
        return func(self, request, *args, **kwargs)
    return wrapper


def check_admin_permission(func):
    @wraps(func)
    def wrapper(self, request, *args, **kwargs):
        user = request.user
        if not user.is_authenticated:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED)
        groups = user.groups.all()
        if not groups or groups[0].name != "admins":
            return Response({"error": "You are not allowed to use this URL"}, status=status.HTTP_401_UNAUTHORIZED)
        return func(self, request, *args, **kwargs)
    return wrapper
