import json
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from django.utils import timezone

from apps.customer.models import *
from apps.customer.serializers import *

class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated] 

    @action(detail=False, methods=['get'], url_path='table', name='last-10-customers')
    def customers_table(self, request):
        """
        Return last 10 customers based on type (guest or registered).
        Default: registered
        """
        customer_type = request.GET.get('filter', 'registered').lower()
        data = []
        if customer_type == 'guest':
            queryset = Customer.objects.filter(is_guest=True)
            queryset = queryset.order_by('-created_at')[:10]
            for record in queryset:
                data.append({
                    'customer_name': record.name or "GUEST",
                    'customer_status': record.status,
                   'date': record.created_at.strftime('%d-%m-%Y %I:%M:%S %p'),
                })
        else:
            queryset = Customer.objects.filter(is_guest=False)
            queryset = queryset.order_by('-created_at')[:15]
            for record in queryset:
                data.append({
                    'customer_name': record.name,
                    'customer_status': record.status,
                    'date': record.created_at.strftime('%d-%m-%Y %I:%M:%S %p'),
                })

        response_data = {
            "total_records": len(data),
            "data": data
        }

        return Response(response_data)
     
    @action(detail=True, methods=['post'], url_path='most_searched_word/table', name='most-searched-word')
    def most_searched_word(self, request, pk):
        per_page = request.POST.get('per_page', 10)
        page = request.POST.get('page', 1)
        search = request.POST.get('search', '').strip()
        sort_by = request.POST.get('sortby', 'search_count').strip()
        order = request.POST.get('order', 'desc').strip()
        date_start = request.POST.get('date_start', '').strip()
        date_end = request.POST.get('date_end', '').strip()
        
        search_qs = TrackProducts.objects.filter(customer_id=pk)
        valid_sort_fields = ['product_search', 'search_count', 'total_count']
    
        if sort_by in valid_sort_fields :
            sort_by = sort_by if order == 'asc' else f'-{sort_by}'
        else :
            sort_by = 'search_count'        
            
        search_qs = search_qs.values('product_search', 'total_count').annotate(
            last_search=Max('updated_at'),
            search_count=Count('product_search')
        ).order_by(sort_by)
        
        if date_start and date_end :
            search_qs = search_qs.filter(updated_at__range=(date_start, date_end))
        
        if search :
            search_qs = search_qs.filter(product_search__icontains=search)
            
        paginator = Paginator(search_qs, per_page)
        page_obj = paginator.get_page(page)
        
        return Response({
            "total": paginator.count,
            "per_page": per_page,
            "page": page_obj.number,
            "num_pages": paginator.num_pages,
            'results' : page_obj.object_list,
        })
   