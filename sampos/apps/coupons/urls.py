from django.urls import path, include
from apps.coupons.views import coupons_card
from rest_framework.routers import DefaultRouter
from django.contrib.auth import views as auth_views

from apps.core.apis.customer import CustomerViewSet

app_name = "coupons"

urlpatterns = [
    path('', coupons_card, name='coupons_card'),
]