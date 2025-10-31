from django.db import models
from apps.customers.models import Customer
from apps.subscriptions.models import Subscription
from apps.coupons.models import Coupon

class Transaction(models.Model):
    STATUS_CHOICES = (
        ('success', 'Success'),
        ('failed', 'Failed'),
        ('denied', 'Denied'),
        ('error', 'Error'),
        ('processing', 'Processing'),
        ('pending', 'Pending'),
    )

    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    subscription = models.ForeignKey(Subscription, on_delete=models.SET_NULL, null=True, blank=True)
    coupon = models.ForeignKey(Coupon, on_delete=models.SET_NULL, null=True, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_method = models.CharField(max_length=50, null=True, blank=True)
    trn = models.CharField("Transaction Reference Number", max_length=100, unique=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    error_msg = models.TextField(null=True, blank=True)
    api_response = models.JSONField(null=True, blank=True)
    transaction_date = models.DateTimeField(auto_now_add=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "transactions"

    def __str__(self):
        return self.trn
