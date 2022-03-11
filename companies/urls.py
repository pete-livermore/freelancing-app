from django.urls import path
from .views import CompanyDetailView, CompaniesListView

urlpatterns = [
    path('', CompaniesListView.as_view()),
    path('<int:pk>/', CompanyDetailView.as_view())
]
