from rest_framework import serializers
from django.contrib.auth import get_user_model, password_validation
from django.core.exceptions import ValidationError

from django.contrib.auth.hashers import make_password

User = get_user_model()


class AuthUserSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    def validate(self, data):
        print("DATA =>", data)
        password = data.pop("password")
        password_confirmation = data.pop("password_confirmation")
        if password != password_confirmation:
            raise ValidationError(
                {"password_confirmation": "Does not match password"})
        try:
            password_validation.validate_password(password)
        except ValidationError as err:
            raise ValidationError({"detail": err})
        data["password"] = make_password(password)
        return data

    class Meta:
        model = User
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class PublicProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'first_name',
            'last_name',
            'profile_image',
            'business_name',
            'country',
            'business_website',
            'personal_website',
            'linkedin_url',
            'job_title',
            'sector',
            'about_me',
            'jobs',
            'created_jobs',
            'skills',
            'experience',
            'jobs',
            'received_reviews'
        )
