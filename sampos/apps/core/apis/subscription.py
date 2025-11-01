from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.decorators import action
from rest_framework import viewsets
from django.core.paginator import Paginator
from rest_framework.response import Response

from apps.subscriptions.models import Subscription
from apps.subscriptions.serializers import SubscriptionSerializer

class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all().order_by('-id')
    serializer_class = SubscriptionSerializer
    ordering = ['-id']
    permission_classes = [AllowAny]

    @action(detail=False, methods=['get'], url_path='lists', name='lists')
    def subscription_lists(self, request):
        per_page = int(request.GET.get('per_page', 12))
        page = int(request.GET.get('page', 1))

        paginator = Paginator(self.queryset, per_page)
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

    @action(detail=False, methods=['post'], url_path='save', name='save')
    def subscription_save(self, request):
        subscription_id = request.data.get('id')

        if subscription_id:
            try:
                instance = Subscription.objects.get(id=subscription_id)
            except Subscription.DoesNotExist:
                return Response({
                    "status": False,
                    "message": "Subscription not found"
                }, status=404)

            serializer = self.get_serializer(instance, data=request.data, partial=True)

        else:
            serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            type = "Update" if subscription_id else "Insert"
            serializer.save()
            return Response({
                "status": True,
                "message": f"Subscription {type} successfully",
                "data": serializer.data,
                "is_update": bool(subscription_id)
            })

        return Response({
            "status": False,
            "message": "Validation error",
            "errors": serializer.errors
        }, status=400)

    @action(detail=True, methods=['post'], url_path='toggle-subscription-status', name='status')
    def toggle_status(self, request, pk=None):
        try:
            subscription = self.get_object()
            subscription.status = 'inactive' if subscription.status == 'active' else 'active'
            subscription.save()

            return Response({
                "status": True,
                "message": f"{subscription.name} Subscription status updated to {subscription.status}",
                "subscription_id": subscription.id,
                "new_status": subscription.status
            })

        except Subscription.DoesNotExist:
            return Response({
                "status": False,
                "message": "Subscription not found"
            }, status=404)

    @action(detail=True, methods=['delete'], url_path='delete', name='delete')
    def subscription_delete(self, request, pk=None):
        try:
            subscription = self.get_object()
            subscription.delete()
            return Response({
                "status": True,
                "message": f"{subscription.name} Subscription deleted successfully",
                "subscription_id": pk
            })
        except Subscription.DoesNotExist:
            return Response({
                "status": False,
                "message": "Subscription not found"
            }, status=404)
