from django.urls import path, include
from apps.reports.views import reports
from rest_framework.routers import DefaultRouter
from django.contrib.auth import views as auth_views

from apps.core.apis.customer import CustomerViewSet

app_name = "reports"

urlpatterns = [
    path('', reports, name='reports'),
]