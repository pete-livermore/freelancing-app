from .models import Company
from rest_framework.views import APIView
from rest_framework.exceptions import NotFound
from rest_framework.response import Response
from rest_framework import status
from .serializers.common import CompanySerializer
from .serializers.populated import PopulatedCompanySerializer
from django.db import IntegrityError


class CompaniesListView(APIView):
    def get(self, _request):
        companies = Company.objects.all()
        serialized_companies = PopulatedCompanySerializer(companies, many=True)
        return Response(serialized_companies.data, status=status.HTTP_200_OK)

    def post(self, request):
        serialized_company = CompanySerializer(data=request.data)
        print(serialized_company)
        try:
            serialized_company.is_valid()
            print(serialized_company.errors)
            serialized_company.save()
            return Response(serialized_company.data, status=status.HTTP_201_CREATED)
        except AssertionError as err:
            return Response({str(err)}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
        except IntegrityError as err:
            return Response({str(err)}, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


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
