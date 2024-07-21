import jwt
scecret_key = 'django-insecure-=o!1)i!d0phs-xdwf%8rswvda9^ngf+q6z@bloj%od!u&_syk='

def verify_token(token):
    data = jwt.decode(token, scecret_key ,algorithms=['HS256'])
    user_id = data.get('user_id')
    return user_id, data

token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIxNzI4NDY2LCJpYXQiOjE3MjExMjM2NjYsImp0aSI6ImZiZGI4ZjQyM2RlODQyYmFiZDgzNDEyOTA3NWQ1NmQ3IiwidXNlcl9pZCI6MX0.a8y8umlvDJlrElPyppEiu_Y8WhoZO_gKDIa-jkF17dg'

res = verify_token(token)
print(res)