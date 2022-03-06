from django.db import IntegrityError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound
from django.contrib.auth import get_user_model
from jwt_auth.serializers.common import SkillSerializer, UserSerializer
from jwt_auth.serializers.populated import PopulatedUserSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from jwt_auth.models import Skill

# Create your views here.
User = get_user_model()


class ProfileListView(APIView):
    # This specifies the permissions classes a view should have

    def get(self, _request):
        users = User.objects.all()
        serialized_users = UserSerializer(users, many=True)
        return Response(serialized_users.data, status=status.HTTP_200_OK)


class ProfileDetailView(APIView):
    def retrieve_user(self, pk):
        try:
            return User.objects.get(pk=pk)
        except User.DoesNotExist:
            raise NotFound(detail="User not found")

    def get(self, _request, pk):
        user_to_retrieve = self.retrieve_user(pk=pk)
        serialized_user = PopulatedUserSerializer(user_to_retrieve)
        return Response(serialized_user.data, status=status.HTTP_200_OK)


class OwnProfileDetailView(APIView):

    def get(self, request):
        print(request.user.id)
        try:
            user_to_retrieve = User.objects.get(pk=request.user.id)
            serialized_user = PopulatedUserSerializer(user_to_retrieve)
            return Response(serialized_user.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            raise NotFound(detail="User not found")

    def put(self, request):
        user_to_update = User.objects.get(pk=request.user.id)
        serialized_user = UserSerializer(
            user_to_update, data=request.data)
        try:
            serialized_user.is_valid()
            serialized_user.save()
            return Response(serialized_user.data, status=status.HTTP_200_OK)
        except IntegrityError:
            return Response("Unprocessable entity", status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class SkillsListView(APIView):
    def get(self, _request):
        skills = Skill.objects.all()
        serialized_skills = SkillSerializer(skills, many=True)
        return Response(serialized_skills.data, status=status.HTTP_200_OK)

    def post(self, request):
        serialized_skill = SkillSerializer(data=request.data)
        print(serialized_skill)
        try:
            serialized_skill.is_valid()
            print(serialized_skill.errors)
            serialized_skill.save()
            return Response(serialized_skill.data, status=status.HTTP_201_CREATED)
        except AssertionError as err:
            return Response(serialized_skill.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except IntegrityError:
            return Response("Unprocessable entity", status=status.HTTP_422_UNPROCESSABLE_ENTITY)