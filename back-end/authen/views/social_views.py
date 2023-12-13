from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.hashers import make_password
from rest_framework.utils import json
from rest_framework.views import APIView
from rest_framework import status
import requests
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from authen.models import CustomUser
from allauth.account.views import SignupView
from allauth.socialaccount.models import SocialApp
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from django.contrib.auth.models import Group
from dj_rest_auth.registration.views import SocialLoginView


class GoogleView(APIView):
    def post(self, request):
        payload = {"access_token": request.data.get("token")}
        r = requests.get(
            "https://www.googleapis.com/oauth2/v2/userinfo", params=payload
        )
        data = json.loads(r.text)

        if "error" in data:
            content = {
                "message": "wrong google token / this google token is already expired."
            }
            return Response(content)

        # create user if not exist
        try:
            user = CustomUser.objects.get(email=data["email"])
        except CustomUser.DoesNotExist:
            user = CustomUser()
            user.username = data["email"]
            # provider random default password
            user.password = make_password(BaseUserManager().make_random_password())
            user.email = data["email"]
            user.save()
            filtr_gr = Group.objects.filter(id=2)
            for i in filtr_gr:
                user.groups.add(i.id)

        token = RefreshToken.for_user(
            user
        )  # generate token without username & password
        response = {}
        response["username"] = user.username
        response["access_token"] = str(token.access_token)
        response["refresh_token"] = str(token)
        return Response(response)


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter

    def login(self):
        # Perform any additional actions here if needed
        response = super().login()
        # Add any extra data to the response if needed
        return response


class FacebookSignupView(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter

    def login(self):
        # Perform any additional actions here if needed
        response = super().login()
        # Add any extra data to the response if needed
        return response


class FacebookTokenView(APIView):
    def post(self, request):
        access_token = request.data.get('access_token')
        adapter = FacebookOAuth2Adapter(request)
        user_data = adapter.complete_login(access_token)

        # Check if user already exists
        try:
            user = CustomUser.objects.get(email=user_data['email'])
        except CustomUser.DoesNotExist:
            # If the user doesn't exist, create a new user
            user = CustomUser.objects.create_user(email=user_data['email'], username=user_data['email'])

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        response_data = {
            'access_token': access_token,
            'user_id': user.id,
            'email': user.email,
            # Add any other user data you want to include in the response
        }

        return Response(response_data, status=status.HTTP_200_OK)


class FacebookSignup(SignupView):
    adapter_class = FacebookOAuth2Adapter
