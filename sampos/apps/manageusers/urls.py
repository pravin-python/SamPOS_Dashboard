from django.urls import path, include
from apps.manageusers.views import manage_users
from rest_framework.routers import DefaultRouter
from django.contrib.auth import views as auth_views

from apps.core.apis.customer import CustomerViewSet

app_name = "manageusers"

urlpatterns = [
    path('', manage_users, name='manage_users'),
]