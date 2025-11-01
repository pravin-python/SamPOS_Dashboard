from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from apps.subscriptions.models import Subscription
from django.conf import settings

@login_required(login_url='core:auth_signin')
def subscriptions_card(request):
    status_choices = Subscription.STATUS_CHOICES
    duration_choices = Subscription.DURATION_CHOICES

    context = {
        'status_choices' : status_choices,
        'duration_choices' : duration_choices,
        'APIKEY': getattr(settings, "API_KEY", None),
    }
    return render(request,'apps/subscriptions/subscriptions_card.html', context)
