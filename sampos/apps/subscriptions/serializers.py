from rest_framework import serializers
from apps.subscriptions.models import *


class SubscriptionSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%d-%m-%Y %I:%M:%S %p", read_only=True)
    updated_at = serializers.DateTimeField(format="%d-%m-%Y %I:%M:%S %p", read_only=True)
    class Meta:
        model = Subscription
        fields = '__all__'
