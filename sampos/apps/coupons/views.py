from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

@login_required(login_url='core:auth_signin')
def coupons_card(request):
    return render(request,'apps/coupons/coupons_card.html')