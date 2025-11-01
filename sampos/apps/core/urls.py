from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter
from django.contrib.auth import views as auth_views

from apps.core.apis.customer import CustomerViewSet
from apps.core.apis.subscription import SubscriptionViewSet
from apps.core.apis.coupons import CouponViewSet


app_name = "core"
router = DefaultRouter()

router.register(r'customers', CustomerViewSet, basename='customer')
router.register(r'subscription', SubscriptionViewSet, basename='subscription')
router.register(r'coupon', CouponViewSet, basename='coupon')


urlpatterns = [
    path('', views.home, name='index'),
    path('accounts/auth-signup/', views.auth_signup, name = 'auth_signup'),
    path('accounts/auth-signin/', views.AuthSignin.as_view(), name='auth_signin'),
    path('accounts/forgot-password/', views.UserPasswordResetView.as_view(), name='forgot_password'),
    path('accounts/password-reset-done/', auth_views.PasswordResetDoneView.as_view(template_name='accounts/password_reset_done.html'), name='password_reset_done'),
    path('accounts/password-reset-confirm/<uidb64>/<token>/',  views.UserPasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    path('accounts/password-reset-complete/', auth_views.PasswordResetCompleteView.as_view(template_name='accounts/password_reset_complete.html'), name='password_reset_complete'),
    path('accounts/logout/', views.user_logout_view, name='logout'),
    path('accounts/password-change/', views.UserPasswordChangeView.as_view(), name='password_change'),
    path('accounts/password-change-done/', auth_views.PasswordChangeDoneView.as_view(template_name='accounts/password_change_done.html'), name="password_change_done" ),

    path('api/', include(router.urls)),

]