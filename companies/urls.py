from django.urls import path
from .views import CompanyDetailView

urlpatterns = [
    path('<int:pk>/', CompanyDetailView.as_view())
]
