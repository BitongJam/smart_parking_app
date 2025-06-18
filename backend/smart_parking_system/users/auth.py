from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.exceptions import AuthenticationFailed

class JWTAuthFromCookie(JWTAuthentication):
    def authenticate(self, request):
        # This custom authenticate function will be the one who check on Authentication Stored on Cookies
        raw_token = request.COOKIES.get("access")

        if raw_token is None:
            return None
        
        try:
            validated_token = self.get_validated_token(raw_token)
            return self.get_user(validated_token), validated_token
        except AuthenticationFailed:
            return None
