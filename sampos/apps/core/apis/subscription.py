import json
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from django.utils import timezone

from django.core.paginator import Paginator
from apps.subscriptions.serializers import SubscriptionSerializer
from apps.subscriptions.models import Subscription


class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer

    @action(detail=False, methods=['get'], url_path='lists', name='subscription-lists')
    def subscription_lists(self, request):
        per_page = request.POST.get('per_page', 10)
        page = request.POST.get('page', 1)
        subscription = Subscription.objects.all()
        paginator = Paginator(subscription, per_page)
        page_obj = paginator.get_page(page)

        return Response({
            "total": paginator.count,
            "per_page": per_page,
            "page": page_obj.number,
            "num_pages": paginator.num_pages,
            'date': page_obj.object_list,
        })

    @action(detail=False, methods=['post'], url_path='create', name='subscription-create')
    def subscription_create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "status": True,
                "message": "Subscription created successfully",
                "data": serializer.data
            })
        else:
            return Response({
                "status": False,
                "message": "Validation failed",
                "errors": serializer.errors
            }, status=400)
