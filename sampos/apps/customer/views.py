from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

@login_required(login_url='core:auth_signin')
def customers_list(request):
    return render(request,'apps/customer/customers_list.html')