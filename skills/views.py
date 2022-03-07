from django.db import IntegrityError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Skill
from .serializers.common import SkillSerializer


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
