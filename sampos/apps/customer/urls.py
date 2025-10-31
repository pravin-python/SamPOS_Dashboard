from django.urls import path, include
from apps.customer.views import customers_list
from rest_framework.routers import DefaultRouter
from django.contrib.auth import views as auth_views

from apps.core.apis.customer import CustomerViewSet

app_name = "customer"

urlpatterns = [
    path('', customers_list, name='customer'),
]