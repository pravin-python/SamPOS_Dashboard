from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.conf import settings

class APIKeyAuthentication(BaseAuthentication):
    def authenticate(self, request):
        api_key = request.headers.get('X-API-Key')
        print(api_key)

        if not api_key:
            return (None, None)

        if api_key != getattr(settings, "API_KEY", None):
            raise AuthenticationFailed("Invalid API Key")

        return None
