from .models import Company
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework import status
from .serializers.populated import PopulatedCompanySerializer


class CompanyDetailView(APIView):
    def retrieve_company(self, pk):
        try:
            return Company.objects.get(pk=pk)
        except Company.DoesNotExist:
            raise NotFound(detail="Company not found")

    def get(self, _request, pk):
        company_to_retrieve = self.retrieve_company(pk=pk)
        serialized_company = PopulatedCompanySerializer(company_to_retrieve)
        return Response(serialized_company.data, status=status.HTTP_200_OK)
