from django.db import models

class Subscription(models.Model):
    STATUS_CHOICES = (
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    )
    DURATION_CHOICES = (
        (30, 'Monthly (30 days)'),
        (180, 'Bi-Annually (180 days)'),
        (360, 'Annually (360 days)'),
    )

    name = models.CharField(max_length=100)
    features = models.TextField(null=True, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    duration = models.PositiveIntegerField(choices=DURATION_CHOICES)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "subscriptions"

    def __str__(self):
        return self.name
