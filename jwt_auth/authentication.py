from rest_framework.authentication import BasicAuthentication
from django.contrib.auth import get_user_model
import jwt
from rest_framework.exceptions import PermissionDenied
from django.conf import settings

User = get_user_model()


class JWTAuthentication(BasicAuthentication):
    def authenticate(self, request):
        header = request.headers.get("Authorization")
        if not header:
            return None
        if not header.startswith("Bearer"):
            raise PermissionDenied(detail="Invalid auth token format")
        token = header.replace("Bearer ", "")

        try:
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms=["HS256"]
            )
            print(payload)
            user = User.objects.get(pk=payload.get("sub"))
        except jwt.exceptions.InvalidTokenError as err:
            print(err)
            raise PermissionDenied(detail="User does not exist")
        return (user, token)
