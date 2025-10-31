from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from rest_framework import viewsets
from django.core.paginator import Paginator
from rest_framework.response import Response

from apps.subscriptions.models import Subscription
from apps.subscriptions.serializers import SubscriptionSerializer

class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    permission_classes = [IsAuthenticated]  # Default rule

    def get_permissions(self):
        if self.action == 'subscription_lists':
            return [AllowAny()]
        return [IsAuthenticated()]

    @action(detail=False, methods=['get'], url_path='lists')
    def subscription_lists(self, request):
        per_page = int(request.GET.get('per_page', 10))
        page = int(request.GET.get('page', 1))

        subscription = Subscription.objects.all()
        paginator = Paginator(subscription, per_page)
        page_obj = paginator.get_page(page)

        serializer = self.get_serializer(page_obj, many=True)

        return Response({
            "status": True,
            "total": paginator.count,
            "per_page": per_page,
            "page": page_obj.number,
            "num_pages": paginator.num_pages,
            "data": serializer.data,
        })

    @action(detail=False, methods=['post'], url_path='create')
    def subscription_create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "status": True,
                "message": "Subscription created successfully",
                "data": serializer.data
            })
        return Response({
            "status": False,
            "message": "Validation failed",
            "errors": serializer.errors
        }, status=400)
