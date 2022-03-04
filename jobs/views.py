from django.db import IntegrityError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .serializers.common import JobSerializer
from .serializers.populated import PopulatedJobSerializer
from .models import Job

# Create your views here.


class JobListView(APIView):
    permissions_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request):
        jobs = Job.objects.all()
        serialized_job = JobSerializer(jobs, many=True)
        return Response(serialized_job.data, status=status.HTTP_200_OK)

    def post(self, request):
        request.data["owner"] = request.user.id
        print(JobSerializer(data=request.data))
        serialized_job = JobSerializer(data=request.data)
        try:
            serialized_job.is_valid()
            serialized_job.save()
            return Response(serialized_job.data, status=status.HTTP_201_CREATED)
        except AssertionError as err:  # AssertionError can't be converted to JSON so need to convert to string
            return Response(
                {"detail": str(err)}, status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )
        except:
            return Response(
                "Unprocessable entity", status=status.HTTP_422_UNPROCESSABLE_ENTITY
            )


class JobDetailedView(APIView):

    def get(self, _request, pk):
        try:
            job_to_retrieve = Job.objects.get(pk=pk)
            serialized_job = PopulatedJobSerializer(job_to_retrieve)
            return Response(serialized_job.data, status=status.HTTP_200_OK)
        except Job.DoesNotExist:
            raise NotFound(detail="Job not found")

    def delete(self, request, pk):
        try:
            job_to_delete = Job.objects.get(pk=pk)
            job_to_delete.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Job.DoesNotExist:
            raise NotFound(detail="Job not found")
