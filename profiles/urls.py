from django.urls import path
from .views import OwnProfileDetailView, ProfileListView, ProfileDetailView

urlpatterns = [
    path('', ProfileListView.as_view()),
    path('<int:pk>/', ProfileDetailView.as_view()),
    path('profile/', OwnProfileDetailView.as_view()),
]
