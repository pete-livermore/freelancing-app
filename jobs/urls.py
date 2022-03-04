from django.urls import path

from jobs.views import JobDetailedView, JobListView

urlpatterns = [
    path('', JobListView.as_view()),
    path('<int:pk>/', JobDetailedView.as_view())
]
