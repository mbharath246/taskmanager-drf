from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken



def get_token_data(token):
    try:
        UntypedToken(token)
        token_data = api_settings.AUTH_TOKEN_CLASSES[0](token).payload
        if isinstance(token_data, str):  # This means an error message was returned
                return False
        return token_data
    except (InvalidToken, TokenError) as e:
        return str(e)


def get_token_user_id(request):
    header: str = request.headers.get('Authorization')
    if not header.startswith('Bearer '):
        return False
    token = header.split()[1]
    token_data = get_token_data(token)
    if not token_data:
        return False
    user_id = token_data.get('user_id', None)
    if not user_id:
        return False
    return user_id