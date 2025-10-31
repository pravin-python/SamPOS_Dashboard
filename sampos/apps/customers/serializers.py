from rest_framework import serializers
from apps.customers.models import *


class CustomerSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%d-%m-%Y %I:%M:%S %p", read_only=True)
    updated_at = serializers.DateTimeField(format="%d-%m-%Y %I:%M:%S %p", read_only=True)
    class Meta:
        model = Customer
        fields = '__all__'
