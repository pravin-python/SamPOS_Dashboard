from django.urls import path, include
from apps.subscriptions.views import subscriptions_card
from rest_framework.routers import DefaultRouter
from django.contrib.auth import views as auth_views

from apps.core.apis.customer import CustomerViewSet

app_name = "subscriptions"

urlpatterns = [
    path('', subscriptions_card, name='subscriptions_card'),
]