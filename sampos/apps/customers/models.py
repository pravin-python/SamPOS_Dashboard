from django.db import models
from apps.subscriptions.models import Subscription

class Customer(models.Model):
    CUSTOMER_TYPES = (
        ('dealer', 'Dealer'),
        ('distributor', 'Distributor'),
        (None, 'None'),
    )
    STATUS_CHOICES = (
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    )

    dealer_id = models.CharField(max_length=100, unique=True, )
    dealer_password = models.CharField(max_length=128)
    customer_type = models.CharField(max_length=20, choices=CUSTOMER_TYPES, null=True, blank=True)
    dd_name = models.CharField("Dealer/Distributor Name", max_length=100, null=True, blank=True)
    subscription_plan = models.ForeignKey(
        Subscription, on_delete=models.SET_NULL, null=True, blank=True
    )
    subscription_status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')
    last_login = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "customers"

    def __str__(self):
        return self.dealer.username

class CustomerSubscription(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    subscription = models.ForeignKey(Subscription, on_delete=models.CASCADE)
    subscribed_from = models.DateField()
    subscribed_to = models.DateField()

    class Meta:
        db_table = "customer_subscripations"

    def __str__(self):
        return f"{self.customer} -> {self.subscription}"
