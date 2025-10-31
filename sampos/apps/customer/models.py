from django.db import models

class Customer(models.Model):
    class CustomerType(models.TextChoices):
        DEALER = 'dealer', 'Dealer'
        DISTRIBUTOR = 'distributor', 'Distributor'
        NONE = 'none', 'None'

    dealer_id = models.CharField(max_length=100, unique=True, )

    dealer_password = models.CharField(max_length=255)

    customer_type = models.CharField(
        max_length=20,
        choices=CustomerType.choices,
        default=CustomerType.NONE
    )

    dd_name = models.CharField(
        max_length=255,
        null=True,
        blank=True,
        help_text="Dealer/Distributor Display Name"
    )

    subscription_plan = models.CharField(
        max_length=100,
        null=True,
        blank=True
    )

    subscription_status = models.BooleanField(default=False)

    last_login = models.DateTimeField(null=True, blank=True)

    status = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.dealer_id} - {self.customer_type}"
