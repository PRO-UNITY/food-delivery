""" Django DRF Packaging """
import random
from drf_spectacular.utils import extend_schema
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import update_session_auth_hash
from django.shortcuts import get_object_or_404
from rest_framework import status, permissions
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from authen.renderers import UserRenderers
from authen.models import CustomUser, Gender, KitchenUser
from authen.pagination import StandardResultsSetPagination
from authen.serializers.authen_serializers import (
    AllGenderListSerializers,
    UserSignUpSerializers,
    KitchenSignUpSerializers,
    UserSigInInSerializers,
    UserUpdateSerializers,
    UserInformationSerializers,
    ChangePasswordSerializer,
    LogoutSerializer,
)


# JWT token refresh
def get_token_for_user(user):
    """Django Authe token"""
    refresh = RefreshToken.for_user(user)
    return {"refresh": str(refresh), "access": str(refresh.access_token)}


class UserGenderViews(APIView):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    def get(self, request):
        queryset = Gender.objects.filter()
        serializers = AllGenderListSerializers(queryset, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class UserRegisterViews(APIView):
    """UserRegister Views"""

    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def post(self, request):
        serializer = UserSignUpSerializers(data=request.data)
        if serializer.is_valid(raise_exception=True):
            instanse = serializer.save()
            tokens = get_token_for_user(instanse)
            return Response({"token": tokens}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class KitchenRegisterViews(APIView):
    """UserRegister Views"""

    def post(self, request):
        serializer = KitchenSignUpSerializers(data=request.data)
        if serializer.is_valid(raise_exception=True):
            instanse = serializer.save()
            tokens = get_token_for_user(instanse)
            return Response({"token": tokens}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserSigInViews(APIView):
    """UserSigIn Views"""

    render_classes = [UserRenderers]

    def post(self, request):
        serializer = UserSigInInSerializers(data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            username = request.data["username"]
            password = request.data["password"]
            user = authenticate(username=username, password=password)
            if user is not None:
                tokens = get_token_for_user(user)
                return Response(
                    {"token": tokens, "message": "Welcome to the system"},
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {
                        "error": {
                            "none_filed_error": [
                                "This user is not available to the system"
                            ]
                        }
                    },
                    status=status.HTTP_404_NOT_FOUND,
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SendEmailCode(APIView):
    """Chack SMS class"""

    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request):
        """Random sms code"""
        data = request.user
        verification_code = str(random.randint(100000, 999999))
        send_mail(
            "Verification Code",
            f"Your verification code is: {verification_code}",
            "istamovibrohim8@gmail.com",
            [data.email],
            fail_silently=False,
        )

        code_save = CustomUser.objects.filter(id=request.user.id)[0]
        code_save.email_code = verification_code
        code_save.save()
        return Response({"message": "Send code email"})

    def post(self, request):
        email_code = request.data["email_code"]
        if email_code == "":
            context = {"Enter the email code !"}
            return Response(context, status=status.HTTP_401_UNAUTHORIZED)
        user_get = CustomUser.objects.filter(id=request.user.id)[0]
        if email_code == user_get.email_code:
            context = {"Welcome to the system !"}
            return Response(context, status=status.HTTP_200_OK)
        else:
            return Response({"error": "The email code is incorrect !"})


class UserProfilesViews(APIView):
    """User Pofiles classs"""

    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    def get(self, request):
        """User information views"""
        serializer = UserInformationSerializers(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserDeteilseViews(APIView):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    def get(self, request, pk):
        queryset = CustomUser.objects.filter(id=pk)
        serializers = UserProfilesViews(queryset, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class UserUpdateView(APIView):
    """User PUT Class"""

    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    def put(self, request):
        """User Update views"""
        queryset = get_object_or_404(CustomUser, id=request.user.id)
        serializer = UserUpdateSerializers(
            instance=queryset,
            data=request.data,
            partial=True,
        )
        if serializer.is_valid(raise_exception=True):
            serializer.save(avatar=request.data.get("avatar"))
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(
            {"error": "update error data"}, status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def change_password(request):
    if request.method == "POST":
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            if user.check_password(serializer.data.get("old_password")):
                user.set_password(serializer.data.get("new_password"))
                user.save()
                update_session_auth_hash(request, user)
                return Response(
                    {"message": "Password changed successfully."},
                    status=status.HTTP_200_OK,
                )
            return Response(
                {"error": "Incorrect old password."}, status=status.HTTP_400_BAD_REQUEST
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutAPIView(APIView):
    serializer_class = LogoutSerializer
    permission_classes = (permissions.IsAuthenticated,)

    @extend_schema(request=None, responses=LogoutSerializer)
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_204_NO_CONTENT)


class RegisterDeliveryViews(APIView):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    def post(self, request):
        kit = KitchenUser.objects.filter(user_id=request.user)[0]
        serializer = KitchenSignUpSerializers(
            data=request.data,
            context={'delivery': kit}
        )
        if serializer.is_valid(raise_exception=True):
            instanse = serializer.save()
            tokens = get_token_for_user(instanse)
            return Response({"token": tokens}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
