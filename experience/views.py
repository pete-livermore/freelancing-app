from django.db import IntegrityError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Experience
from .serializers.common import ExperienceSerializer


class ExperiencesListView(APIView):
    def get(self, _request):
        experiences = Experience.objects.all()
        serialized_experiences = ExperienceSerializer(experiences, many=True)
        return Response(serialized_experiences.data, status=status.HTTP_200_OK)

    def post(self, request):
        serialized_experience = ExperienceSerializer(data=request.data)
        print(serialized_experience)
        try:
            serialized_experience.is_valid()
            print(serialized_experience.errors)
            serialized_experience.save()
            return Response(serialized_experience.data, status=status.HTTP_201_CREATED)
        except AssertionError as err:
            return Response(serialized_experience.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except IntegrityError:
            return Response("Unprocessable entity", status=status.HTTP_422_UNPROCESSABLE_ENTITY)
