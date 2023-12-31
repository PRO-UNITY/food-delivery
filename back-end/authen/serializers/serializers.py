from rest_framework import serializers
from authen.views.facebook import Facebook
from authen.views.register import register_social_user


class FacebookSocialAuthSerializer(serializers.Serializer):
    auth_token = serializers.CharField()

    def validate_auth_token(self, auth_token):
        user_data = Facebook.validate(auth_token)

        try:
            user_id = user_data["id"]
            email = user_data["email"]
            name = user_data["name"]
            provider = "facebook"
            return register_social_user(
                provider=provider, user_id=user_id, email=email, name=name
            )

        except Exception as identifier:
            raise serializers.ValidationError(
                "The token  is invalid or expired. Please login again."
            )
