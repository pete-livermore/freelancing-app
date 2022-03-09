from urllib import request
from django.db import IntegrityError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .serializers.common import JobSerializer
from .serializers.populated import PopulatedJobSerializer
from .models import Job


class JobListView(APIView):
    permissions_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request):
        jobs = Job.objects.all()
        serialized_job = PopulatedJobSerializer(jobs, many=True)
        return Response(serialized_job.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data["owner"] = request.user.id
        serialized_job = JobSerializer(data=request.data)
        try:
            serialized_job.is_valid()
            print(serialized_job.errors)
            serialized_job.save()
            return Response(serialized_job.data, status=status.HTTP_201_CREATED)
        except AssertionError as err:
            return Response(
                {"detail": str(err)}, status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )
        except IntegrityError as err:
            return Response(
                str(err), status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )


class JobDetailedView(APIView):
    permissions_classes = (IsAuthenticatedOrReadOnly,)

    def retrieve_job(self, pk):
        try:
            return Job.objects.get(pk=pk)
        except Job.DoesNotExist:
            raise NotFound(detail="Job not found")

    def get(self, _request, pk):
        job_to_retrieve = self.retrieve_job(pk=pk)
        serialized_job = PopulatedJobSerializer(job_to_retrieve)
        return Response(serialized_job.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        job_to_retrieve = self.retrieve_job(pk=pk)
        serialized_job = PopulatedJobSerializer(
            job_to_retrieve, data=request.data)
        try:
            serialized_job.is_valid()
            serialized_job.save()
            return Response(serialized_job.data, status=status.HTTP_200_OK)
        except AssertionError as err:
            return Response({"detail": str(err)}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

    def delete(self, request, pk):
        job_to_delete = self.retrieve_job(pk=pk)
        job_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
