from django.urls import path
from .views import MilestoneListView, MilestoneDetailView

urlpatterns = [
    path('', MilestoneListView.as_view()),
    path('<int:pk>/', MilestoneDetailView.as_view())
]
