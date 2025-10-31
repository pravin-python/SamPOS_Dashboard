from django.db import models

# Create your models here.
class Coupon(models.Model):
    STATUS_CHOICES = (
        ('active', 'Active'),
        ('inactive', 'Inactive'),
    )

    coupon_code = models.CharField(max_length=50, unique=True)
    valid_from = models.DateField()
    valid_to = models.DateField()
    discount_type = models.CharField(max_length=10, choices=(('fixed', 'Fixed'), ('percentage', 'Percentage')))
    discount_value = models.PositiveIntegerField()
    usage_limit = models.PositiveIntegerField(default=1)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='active')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "coupons"

    def __str__(self):
        return self.coupon_code
