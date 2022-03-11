from django.urls import path
from .views import ExperiencesListView

urlpatterns = [
    path('', ExperiencesListView.as_view())
]
