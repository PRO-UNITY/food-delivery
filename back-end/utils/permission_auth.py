import requests
from functools import wraps
from rest_framework.response import Response
from rest_framework import status

def check_user_permission(func):
    @wraps(func)
    def wrapper(self, request, *args, **kwargs):
        token = request.headers.get('Authorization', None)
        if not token:
            return Response({'error': 'The user is not logged in'}, status=status.HTTP_400_BAD_REQUEST)
        user_data, error_response = fetch_user_data(token)
        if error_response:
            return error_response
        user_id = user_data.get('id')
        user_group = user_data.get('role')
        if not user_id:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED)
        if user_group != "users":
            return Response({"error": "You are not allowed to use this URL"}, status=status.HTTP_401_UNAUTHORIZED)
        return func(self, request, user_id=user_id, *args, **kwargs)
    return wrapper

def check_kitchen_permission(func):
    @wraps(func)
    def wrapper(self, request, *args, **kwargs):
        token = request.headers.get('Authorization', None)
        if not token:
            return Response({'error': 'The user is not logged in'}, status=status.HTTP_400_BAD_REQUEST)
        user_data, error_response = fetch_user_data(token)
        if error_response:
            return error_response
        user_id = user_data.get('id')
        user_group = user_data.get('role')
        if not user_id:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED)
        if user_group != "kitchen":
            return Response({"error": "You are not allowed to use this URL"}, status=status.HTTP_401_UNAUTHORIZED)
        return func(self, request, user_id=user_id, *args, **kwargs)
    return wrapper

def check_kitchentwo_permission(func):
    @wraps(func)
    def wrapper(self, request, *args, **kwargs):
        token = request.headers.get('Authorization', None)
        user_data, error_response = fetch_user_data(token)
        user_id = user_data.get('id')
        return func(self, request, user_id=user_id, *args, **kwargs)
    return wrapper


def check_admin_permission(func):
    @wraps(func)
    def wrapper(self, request, *args, **kwargs):
        token = request.headers.get('Authorization', None)
        if not token:
            return Response({'error': 'The user is not logged in'}, status=status.HTTP_400_BAD_REQUEST)
        user_data, error_response = fetch_user_data(token)
        if error_response:
            return error_response
        user_id = user_data.get('id')
        user_group = user_data.get('role')
        if not user_id:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED)
        if user_group != "admins":
            return Response({"error": "You are not allowed to use this URL"}, status=status.HTTP_401_UNAUTHORIZED)
        return func(self, request, user_id=user_id, *args, **kwargs)
    return wrapper

def fetch_user_data(token):
    url = "http://127.0.0.1:8001/auth/users"
    headers = {'Authorization': f'Bearer {token}'}
    
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raise an HTTPError for bad responses
        user_data = response.json()
        print(user_data)
        return user_data, None
    except requests.RequestException as e:
        error_message = f"Error fetching user data: {str(e)}"
        return None, Response({"error": error_message}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
