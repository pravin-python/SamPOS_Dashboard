from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.contrib.auth import logout
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import user_passes_test
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django.contrib.auth import views as auth_views
from apps.core.forms import RegistrationForm, LoginForm, UserPasswordResetForm, UserSetPasswordForm, UserPasswordChangeForm

# Create your views here.
@login_required(login_url='core:auth_signin')
def home(request):
    return render(request,'apps/core/index.html')
      

@login_required(login_url='core:auth_signin')
def auth_signup(request):
  
  if not request.user.is_superuser:
        return redirect('core:auth_signin')
  
  if request.method == 'POST':
      form = RegistrationForm(request.POST)
      if form.is_valid():
        form.save()
        return redirect('core:index')
      else:
        print("Registration failed!")
  else:
    form = RegistrationForm()
  context = {'form': form}
  return render(request, 'accounts/auth-signup.html', context)

class AuthSignin(auth_views.LoginView):
    template_name = 'accounts/auth-signin.html'
    form_class = LoginForm
    success_url = '/'

    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect('core:index')
        return super().dispatch(request, *args, **kwargs)


class UserPasswordResetView(auth_views.PasswordResetView):
    template_name = 'accounts/forgot-password.html'
    form_class = UserPasswordResetForm

    # def dispatch(self, request, *args, **kwargs):
    #     if request.user.is_authenticated:
    #         return redirect('index')
    #     return super().dispatch(request, *args, **kwargs)

class UserPasswordResetConfirmView(auth_views.PasswordResetConfirmView):
  template_name = 'accounts/recover-password.html'
  form_class = UserSetPasswordForm

class UserPasswordChangeView(LoginRequiredMixin, auth_views.PasswordChangeView):
    template_name = 'accounts/password_change.html'
    form_class = UserPasswordChangeForm
    success_url = reverse_lazy('core:index')

    login_url = reverse_lazy('core:auth_signin')

class UserPasswordResetConfirmView(auth_views.PasswordResetConfirmView):
  template_name = 'accounts/recover-password.html'
  form_class = UserSetPasswordForm

def user_logout_view(request):
  logout(request)
  return redirect('core:auth_signin')

# Pages

@login_required(login_url='/accounts/auth-signin')
def user_profile(request):
    return render(request, 'pages/user-profile.html')
