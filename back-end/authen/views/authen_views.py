""" Django DRF Packaging """
import random
from drf_spectacular.utils import extend_schema
from django.shortcuts import get_object_or_404
from django.db.models import Q
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.core.exceptions import ObjectDoesNotExist
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
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import action
from authen.renderers import UserRenderers
from authen.models import CustomUser, SmsHistory
from utils.generate_sms import generate_sms_code
from authen.utils import Util
from django.utils.encoding import (
    smart_str,
    smart_bytes,
    DjangoUnicodeDecodeError,
)
from authen.serializers.authen_serializers import (
    UserSignUpSerializer,
    UserSigInSerializer,
    UserUpdateSerializer,
    UserInformationSerializer,
    ChangePasswordSerializer,
    LogoutSerializer,
    ResetPasswordSerializer,
    PasswordResetCompleteSerializer,
)


def get_token_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {"refresh": str(refresh), "access": str(refresh.access_token)}


class UserSignUp(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    @action(methods=['post'], detail=False)
    @swagger_auto_schema(
        request_body=UserSignUpSerializer,
        responses={201: "Created - Item created successfully",},
        tags=["auth"],)
    def post(self, request):
        expected_fields = set(["username", "password", "confirm_password", "first_name", "last_name", "email", "role"])
        received_fields = set(request.data.keys())
        unexpected_fields = received_fields - expected_fields
        if unexpected_fields:
            error_message = (f"Unexpected fields in request data: {', '.join(unexpected_fields)}")
            return Response({"error": error_message}, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user_instance = self.create_user(serializer)
            sms_code = generate_sms_code()
            self.send_verification_email(user_instance, sms_code)
            self.save_sms_code(user_instance, sms_code)
            token = self.generate_user_token(user_instance)

            response_data = {
                # Vaxtinchalikga kodni yuborib tursin kn udalit qilamiz
                "sms_code": sms_code,
                "msg": "Verification code sent to your email, check it",
                "token": token,
            }

            return Response(response_data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get_serializer(self, *args, **kwargs):
        return UserSignUpSerializer(*args, **kwargs)

    def create_user(self, serializer):
        return serializer.save()

    def send_verification_email(self, user_instance, sms_code):
        email_body = f"Hi {user_instance.username},\nThis is your verification code to register your account: {sms_code}\nThanks..."
        email_data = {
            "email_body": email_body,
            "to_email": user_instance.email,
            "email_subject": "Verify your email",
        }
        Util.send(email_data)

    def save_sms_code(self, user_instance, sms_code):
        SmsHistory.objects.create(code=sms_code, user=user_instance)

    def generate_user_token(self, user_instance):
        return get_token_for_user(user_instance)

    def bad_request_response(self, message):
        return Response({"error": message}, status=status.HTTP_400_BAD_REQUEST)


class VerificationSmsCodeView(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]


    def put(self, request):
        if not request.user.is_authenticated:
            return self.unauthorized_response("Token is invalid")

        if "code" not in request.data:
            return self.bad_request_response("Code key is missing in the request data")

        sms_code = request.data["code"]
        user = request.user

        try:
            check_code = self.get_latest_sms_code(user)

            if check_code and check_code.code == int(sms_code):
                self.activate_user(check_code.user)
                token = get_token_for_user(check_code.user)
                return Response({"token": token})

            return self.bad_request_response("The verification code was entered incorrectly")

        except ObjectDoesNotExist:
            return self.bad_request_response("Object does not exist")

    def get_latest_sms_code(self, user):
        return SmsHistory.objects.select_related("user").filter(Q(user=user)).last()

    def activate_user(self, user):
        user.is_staff = True
        user.save()

    def unauthorized_response(self, message):
        return Response({"error": message}, status=status.HTTP_401_UNAUTHORIZED)

    def bad_request_response(self, message):
        return Response({"error": message}, status=status.HTTP_400_BAD_REQUEST)


class ResendCodeByEmailView(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def post(self, request):
        if not request.user.is_authenticated:
            return self.unauthorized_response("Token is invalid")

        if request.user.is_staff:
            return self.error_response("You already verified...")

        sms_code = generate_sms_code()
        self.send_verification_email(request.user, sms_code)
        self.save_sms_code(request.user, sms_code)
        token = self.generate_user_token(request.user)

        return self.success_response(sms_code, token)

    def send_verification_email(self, user, sms_code):
        email_body = f"Hi {user.email} \nThis is your verification code to register your account: {sms_code} \nThanks..."
        email_data = {
            "email_body": email_body,
            "to_email": user.email,
            "email_subject": "Verify your email",
        }
        Util.send(email_data)

    def save_sms_code(self, user, sms_code):
        SmsHistory.objects.create(code=sms_code, user=user)

    def generate_user_token(self, user):
        return get_token_for_user(user)

    def success_response(self, sms_code, token):
        return Response(
            {
                # Vaxtinchalikga kodni yuborib tursin kn udalit qilamiz
                "sms_code": sms_code,
                "msg": "Verification code is sent to your email, check it",
                "token": token,
            },
            status=status.HTTP_201_CREATED,
        )

    def unauthorized_response(self, message):
        return Response({"error": message}, status=status.HTTP_401_UNAUTHORIZED)

    def error_response(self, message):
        return Response({"error": message}, status=status.HTTP_400_BAD_REQUEST)


class UserSignIn(APIView):
    render_classes = [UserRenderers]

    @action(methods=['post'], detail=True)
    @swagger_auto_schema(
        request_body=UserSigInSerializer,
        responses={201: "Created - Item created successfully",},
        tags=["auth"],)
    def post(self, request):
        expected_fields = set(["username", "password"])
        received_fields = set(request.data.keys())
        unexpected_fields = received_fields - expected_fields
        if unexpected_fields:
            error_message = (f"Unexpected fields in request data: {', '.join(unexpected_fields)}")
            return Response({"error": error_message}, status=status.HTTP_400_BAD_REQUEST)
        serializer = UserSigInSerializer(data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            username = request.data["username"]
            password = request.data["password"]
            user = authenticate(username=username, password=password)
            if user is not None:
                tokens = get_token_for_user(user)
                return Response({"token": tokens}, status=status.HTTP_200_OK)
            else:
                return Response({"error": ["This user is not available to the system"]}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfile(APIView):
    render_classes = [UserRenderers]
    permission = [IsAuthenticated]

    def get(self, request):
        if request.user.is_authenticated:
            serializer = UserInformationSerializer(request.user, context={"request": request})
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED)

    @action(methods=['put'], detail=True)
    @swagger_auto_schema(
        request_body=UserUpdateSerializer,
        responses={201: "update - Item update successfully",},
        tags=["auth"],)
    def put(self, request, *args, **kwarg):
        if request.user.is_authenticated:
            expected_fields = set(["username", "password", "confirm_password", "first_name", "last_name", "avatar", "email", "role", "phone", "latitude", "longitude",])
            received_fields = set(request.data.keys())
            unexpected_fields = received_fields - expected_fields
            if unexpected_fields:
                error_message = (f"Unexpected fields in request data: {', '.join(unexpected_fields)}")
                return Response({"error": error_message}, status=status.HTTP_400_BAD_REQUEST)
            queryset = get_object_or_404(CustomUser, id=request.user.id)
            serializer = UserUpdateSerializer(context={"request": request}, instance=queryset, data=request.data, partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save(avatar=request.data.get("avatar"))
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response({"error": "update error data"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED)

    def delete(self, request):
        if request.user.is_authenticated:
            user_delete = CustomUser.objects.get(id=request.user.id)
            user_delete.delete()
            return Response({"message": "delete success"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED)


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
                return Response({"message": "Password changed successfully."}, status=status.HTTP_200_OK)
            return Response({"error": "Incorrect old password."}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SendEmailCode(APIView):
    render_classes = [UserRenderers]
    perrmisson_class = [IsAuthenticated]

    def get(self, request):
        if request.user.is_authenticated:
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
        else:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED)

    def post(self, request):
        if request.user.is_authenticated:
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
        else:
            return Response({"error": "The user is not logged in"}, status=status.HTTP_401_UNAUTHORIZED)


class UserLogout(APIView):
    serializer_class = LogoutSerializer
    permission_classes = (permissions.IsAuthenticated,)

    @action(methods=['post'], detail=False)
    def post(self, request):
        expected_fields = set(["refresh"])
        received_fields = set(request.data.keys())

        unexpected_fields = received_fields - expected_fields
        if unexpected_fields:
            error_message = (f"Unexpected fields in request data: {', '.join(unexpected_fields)}")
            return Response({"error": error_message}, status=status.HTTP_400_BAD_REQUEST)
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_204_NO_CONTENT)


class RequestPasswordRestEmail(generics.GenericAPIView):
    serializer_class = ResetPasswordSerializer

    @swagger_auto_schema(request_body=ResetPasswordSerializer)
    @action(methods=['post'], detail=False)
    def post(self, request):
        email = request.data.get("email")
        print(email)
        if CustomUser.objects.filter(email=email).exists():
            user = CustomUser.objects.get(email=email)
            print(user)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            absurl = f"http://localhost:5173/reset-password/{uidb64}/{token}"
            email_body = f"Hi \n Use link below to reset password \n link: {absurl}"
            data = {
                "email_body": email_body,
                "to_email": user.email,
                "email_subject": "Reset your password",
            }

            Util.send(data)

            return Response({"success": "We have sent you to rest your password"}, status=status.HTTP_200_OK)
        return Response({"error": "This email is not found.."}, status=status.HTTP_404_NOT_FOUND)


class PasswordTokenCheckView(generics.GenericAPIView):
    serializer_class = UserInformationSerializer

    @action(methods=['get'], detail=False)
    def get(self, request, uidb64, token):
        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = CustomUser.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({"error": "Token is not valid, Please request a new one"}, status=status.HTTP_401_UNAUTHORIZED)
            return Response({"success": True, "msg": "Credential Valid", "uidb64": uidb64, "token": token}, status=status.HTTP_200_OK)
        except DjangoUnicodeDecodeError:
            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({"error": "Token is not valid, Please request a new one"}, status=status.HTTP_401_UNAUTHORIZED)


class SetNewPasswordView(generics.GenericAPIView):
    serializer_class = PasswordResetCompleteSerializer

    @action(methods=['patch'], detail=False)
    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({"message": "success"}, status=status.HTTP_200_OK)
