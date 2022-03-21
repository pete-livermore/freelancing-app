from django.contrib.auth import get_user_model
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied, NotFound
from rest_framework import status
from jwt_auth.serializers.common import AuthUserSerializer
from datetime import datetime, timedelta
import jwt
from django.core.exceptions import ValidationError

User = get_user_model()

# Create your views here.


class RegisterView(APIView):
    def post(self, request):
        user_to_create = AuthUserSerializer(data=request.data)
        try:
            user_to_create.is_valid()
            print(user_to_create.errors)
            user_to_create.save()
            return Response(user_to_create.data, status=status.HTTP_201_CREATED)
        except:
            return Response(user_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class LoginView(APIView):
    def post(self, request):
        try:
            user_to_login = User.objects.get(email=request.data.get("email"))
        except User.DoesNotExist:
            raise NotFound(detail="User doesn't exist")
        print(request.data.get("password"))
        print(user_to_login.check_password(request.data.get("password")))
        if not user_to_login.check_password(request.data.get("password")):
            raise PermissionDenied(detail="Unauthorised")
        dt = datetime.now() + timedelta(days=7)
        token = jwt.encode(
            {"sub": user_to_login.id, "expiry": int(dt.strftime("%s"))},
            settings.SECRET_KEY,
            "HS256",
        )
        return Response(
            {"token": token, "message": f"Welcome back {user_to_login.username}"},
            status=status.HTTP_202_ACCEPTED,
        )
