from django.urls import path

from sectors.views import SectorsListView

urlpatterns = [
    path('', SectorsListView.as_view())
]
