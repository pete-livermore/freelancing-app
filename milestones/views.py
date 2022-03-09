from urllib import request
from django.db import IntegrityError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .serializers.common import MilestoneSerializer
from .models import Milestone


class MilestoneListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request):
        milestones = Milestone.objects.all().order_by("due_date", "pk")
        serialized_milestones = MilestoneSerializer(milestones, many=True)
        return Response(serialized_milestones.data, status=status.HTTP_200_OK)


class MilestoneDetailView(APIView):
    permissions_classes = (IsAuthenticatedOrReadOnly,)

    def retrieve_milestone(self, pk):
        try:
            return Milestone.objects.get(pk=pk)
        except Milestone.DoesNotExist:
            raise NotFound(detail="Milestone not found")

    def get(self, _request, pk):
        milestone_to_retrieve = self.retrieve_milestone(pk=pk)
        serialized_milestone = MilestoneSerializer(milestone_to_retrieve)
        return Response(serialized_milestone.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        milestone_to_retrieve = self.retrieve_milestone(pk=pk)
        serialized_milestone = MilestoneSerializer(
            milestone_to_retrieve, data=request.data)
        try:
            serialized_milestone.is_valid()
            serialized_milestone.save()
            return Response(serialized_milestone.data, status=status.HTTP_200_OK)
        except AssertionError as err:
            return Response({"detail": str(err)}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
