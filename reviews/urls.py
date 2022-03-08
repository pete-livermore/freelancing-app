from django.urls import path
from .views import ReviewDetailedView, ReviewListView

urlpatterns = [
    path('', ReviewListView.as_view()),
    path('<int:pk>/', ReviewDetailedView.as_view())
]
