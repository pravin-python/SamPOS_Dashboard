from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.core.paginator import Paginator
from apps.coupons.models import Coupon
from apps.coupons.serializers import CouponSerializer


class CouponViewSet(viewsets.ModelViewSet):
    queryset = Coupon.objects.all().order_by('-id')
    serializer_class = CouponSerializer
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action in ['coupon_list']:
            return [AllowAny()]

        if self.action in ['coupon_save', 'toggle_coupon_status', 'coupon_delete']:
            return [IsAuthenticated()]

        return super().get_permissions()

    @action(detail=False, methods=['get'], url_path='lists')
    def coupon_list(self, request):
        per_page = int(request.GET.get('per_page', 10))
        page = int(request.GET.get('page', 1))

        coupons = Coupon.objects.all().order_by('-id')
        paginator = Paginator(coupons, per_page)
        page_obj = paginator.get_page(page)

        serializer = self.get_serializer(page_obj, many=True)

        return Response({
            "status": True,
            "total": paginator.count,
            "page": page_obj.number,
            "num_pages": paginator.num_pages,
            "data": serializer.data
        })

    @action(detail=False, methods=['post'], url_path='save')
    def coupon_save(self, request):
        coupon_id = request.data.get('id')

        if coupon_id:
            try:
                instance = Coupon.objects.get(id=coupon_id)
            except Coupon.DoesNotExist:
                return Response({"status": False, "message": "Coupon not found"}, status=404)

            serializer = self.get_serializer(instance, data=request.data, partial=True)
            msg = "Coupon Updated Successfully"

        else:
            serializer = self.get_serializer(data=request.data)
            msg = "Coupon Created Successfully"

        if serializer.is_valid():
            serializer.save()
            return Response({
                "status": True,
                "message": msg,
                "data": serializer.data
            })

        return Response({"status": False, "errors": serializer.errors}, status=400)

    @action(detail=True, methods=['delete'], url_path='delete')
    def coupon_delete(self, request, pk=None):
        try:
            coupon = self.get_object()
            coupon.delete()
            return Response({
                "status": True,
                "message": "Coupon Deleted Successfully",
                "coupon_id": pk
            })
        except Coupon.DoesNotExist:
            return Response({"status": False, "message": "Coupon Not Found"}, status=404)
