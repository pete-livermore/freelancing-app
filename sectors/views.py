from rest_framework.views import APIView
from .serializers.common import SectorSerializer
from .models import Sector
from django.db import IntegrityError
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class SectorsListView(APIView):

    def get(self, _request):
        jobs = Sector.objects.all()
        serialized_job = SectorSerializer(jobs, many=True)
        return Response(serialized_job.data, status=status.HTTP_200_OK)
