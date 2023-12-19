""" Django DRF Packaging """
import random
from drf_spectacular.utils import extend_schema
from django.shortcuts import get_object_or_404
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import (
    smart_str,
    smart_bytes,
    DjangoUnicodeDecodeError,
)
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.auth import authenticate
from django.core.mail import send_mail
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import update_session_auth_hash
from django.shortcuts import get_object_or_404
from rest_framework import status, permissions, generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from authen.renderers import UserRenderers
from authen.models import CustomUser
from authen.serializers.authen_serializers import (
    UserSignUpSerializers,
    KitchenSignUpSerializers,
    UserSigInInSerializers,
    UserUpdateSerializers,
    UserInformationSerializers,
    ChangePasswordSerializer,
    LogoutSerializer,
    ResetPasswordSerializer,
    PasswordResetCompleteSerializer,
)
from authen.utils import Util


# JWT token refresh
def get_token_for_user(user):
    """Django Authe token"""
    refresh = RefreshToken.for_user(user)
    return {"refresh": str(refresh), "access": str(refresh.access_token)}


class UserRegisterViews(APIView):
    """UserRegister view"""

    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    @extend_schema(
        request=UserSignUpSerializers,
        responses={201: UserSignUpSerializers},
    )
    def post(self, request):
        expected_fields = set(
            [
                "username",
                "password",
                "confirm_password",
                "first_name",
                "last_name",
                "email",
                "role",
            ]
        )
        received_fields = set(request.data.keys())

        unexpected_fields = received_fields - expected_fields
        if unexpected_fields:
            error_message = (
                f"Unexpected fields in request data: {', '.join(unexpected_fields)}"
            )
            return Response(
                {"error": error_message}, status=status.HTTP_400_BAD_REQUEST
            )
        serializer = UserSignUpSerializers(data=request.data)
        if serializer.is_valid(raise_exception=True):
            instanse = serializer.save()
            tokens = get_token_for_user(instanse)
            return Response({"token": tokens}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class KitchenRegisterViews(APIView):
    """Kitchen register view"""

    @extend_schema(
        request=KitchenSignUpSerializers,
        responses={201: KitchenSignUpSerializers},
    )
    def post(self, request):
        serializer = KitchenSignUpSerializers(data=request.data)
        if serializer.is_valid(raise_exception=True):
            instanse = serializer.save()
            tokens = get_token_for_user(instanse)
            return Response({"token": tokens}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserSigInViews(APIView):
    """Signin users"""

    render_classes = [UserRenderers]

    @extend_schema(
        request=UserSigInInSerializers,
        responses={201: UserSigInInSerializers},
    )
    def post(self, request):
        expected_fields = set(["username", "password"])
        received_fields = set(request.data.keys())

        unexpected_fields = received_fields - expected_fields
        if unexpected_fields:
            error_message = (
                f"Unexpected fields in request data: {', '.join(unexpected_fields)}"
            )
            return Response(
                {"error": error_message}, status=status.HTTP_400_BAD_REQUEST
            )
        serializer = UserSigInInSerializers(data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            username = request.data["username"]
            password = request.data["password"]
            user = authenticate(username=username, password=password)
            if user is not None:
                tokens = get_token_for_user(user)
                return Response(
                    {"token": tokens},
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"error": ["This user is not available to the system"]},
                    status=status.HTTP_404_NOT_FOUND,
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SendEmailCode(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request):
        """Sending a code to the e-mail of the logged-in user"""
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
        """Check the code"""
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
    """User profiles"""

    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    @extend_schema(
        request=UserInformationSerializers,
        responses={201: UserInformationSerializers},
    )
    def get(self, request):
        serializer = UserInformationSerializers(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @extend_schema(
        request=UserUpdateSerializers,
        responses={201: UserUpdateSerializers},
    )
    def put(self, request, *args, **kwarg):
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


class UserDeteilseViews(APIView):
    """Detailed information about the user"""

    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    @extend_schema(
        request=UserProfilesViews,
        responses={201: UserProfilesViews},
    )
    def get(self, request, pk):
        queryset = CustomUser.objects.filter(id=pk)
        serializers = UserProfilesViews(queryset, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


@extend_schema(
    request=ChangePasswordSerializer,
    responses={201: ChangePasswordSerializer},
)
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def change_password(request):
    """Change password"""
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
    """Logout users"""

    serializer_class = LogoutSerializer
    permission_classes = (permissions.IsAuthenticated,)

    @extend_schema(
        request=LogoutSerializer,
        responses={201: LogoutSerializer},
    )
    def post(self, request):
        expected_fields = set(["refresh"])
        received_fields = set(request.data.keys())

        unexpected_fields = received_fields - expected_fields
        if unexpected_fields:
            error_message = (
                f"Unexpected fields in request data: {', '.join(unexpected_fields)}"
            )
            return Response(
                {"error": error_message}, status=status.HTTP_400_BAD_REQUEST
            )
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_204_NO_CONTENT)


class RequestPasswordRestEmail(generics.GenericAPIView):
    serializer_class = ResetPasswordSerializer

    @extend_schema(
        request=ResetPasswordSerializer,
        responses={201: ResetPasswordSerializer},
    )
    def post(self, request):
        serializers = self.serializer_class(data=request.data)

        email = request.data.get("email")
        print(email)
        if CustomUser.objects.filter(email=email).exists():
            user = CustomUser.objects.get(email=email)
            print(user)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            absurl = f"http://localhost:3000/reset-password/{uidb64}/{token}"
            email_body = f"Hi \n Use link below to reset password \n link: {absurl}"
            data = {
                "email_body": email_body,
                "to_email": user.email,
                "email_subject": "Reset your password",
            }

            Util.send(data)

            return Response(
                {"success": "We have sent you to rest your password"},
                status=status.HTTP_200_OK,
            )
        return Response(
            {"error": "This email is not found.."}, status=status.HTTP_404_NOT_FOUND
        )


class PasswordTokenCheckView(generics.GenericAPIView):
    serializer_class = UserInformationSerializers

    @extend_schema(
        request=UserInformationSerializers,
        responses={201: UserInformationSerializers},
    )
    def get(self, request, uidb64, token):
        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = CustomUser.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response(
                    {"error": "Token is not valid, Please request a new one"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )
            return Response(
                {
                    "success": True,
                    "msg": "Credential Valid",
                    "uidb64": uidb64,
                    "token": token,
                },
                status=status.HTTP_200_OK,
            )

        except DjangoUnicodeDecodeError:
            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response(
                    {"error": "Token is not valid, Please request a new one"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )


class SetNewPasswordView(generics.GenericAPIView):
    serializer_class = PasswordResetCompleteSerializer

    @extend_schema(
        request=PasswordResetCompleteSerializer,
        responses={201: PasswordResetCompleteSerializer},
    )
    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({"message": "success"}, status=status.HTTP_200_OK)
