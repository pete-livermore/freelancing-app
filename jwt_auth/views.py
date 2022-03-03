from django.contrib.auth import get_user_model
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework import status
from jwt_auth.serializers.common import UserSerializer
from datetime import datetime, timedelta
import jwt

User = get_user_model()

# Create your views here.


class RegisterView(APIView):
    def post(self, request):
        print(request.data)
        user_to_create = UserSerializer(data=request.data)
        try:
            user_to_create.is_valid()
            user_to_create.save()
            return Response(user_to_create.data, status=status.HTTP_201_CREATED)
        except:
            return Response("Couldn't create user", status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class LoginView(APIView):
    def post(self, request):
        try:
            user_to_login = User.objects.get(email=request.data.get("email"))
            print(type(request.data))
        except User.DoesNotExist:
            return PermissionDenied
        if not user_to_login.check_password(request.data.get("password")):
            return PermissionDenied(detail="Unauthorised")
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
