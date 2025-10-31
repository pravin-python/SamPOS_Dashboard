from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

@login_required(login_url='core:auth_signin')
def reports(request):
    return render(request,'apps/reports/reports.html')