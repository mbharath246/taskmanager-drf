import requests
from pprint import pprint

url = 'http://localhost:8000/users/'
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIxNzI4NDY2LCJpYXQiOjE3MjExMjM2NjYsImp0aSI6ImZiZGI4ZjQyM2RlODQyYmFiZDgzNDEyOTA3NWQ1NmQ3IiwidXNlcl9pZCI6MX0.a8y8umlvDJlrElPyppEiu_Y8WhoZO_gKDIa-jkF17dg'
response = requests.get(url=url, headers={'Authorization':f'Bearer {token}'})
pprint(response.json())


# url = 'http://127.0.0.1:8000/tasks/'
# # response = requests.get(url=url, headers={'Authorization':f'Bearer {token}'})
# response = requests.get(url)
# print(response.json())

# url = 'http://127.0.0.1:8000/users/token/verify/'
# response = requests.post(url, json={'token':token})
# print(response.json())



# auth = Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzIxODAwMzI5LCJpYXQiOjE3MjExOTU1MjksImp0aSI6ImQ1MzdjNmU1YzEzNjRjZjVhYTE0YmU5YmJkODUyOTExIiwidXNlcl9pZCI6NH0.jLH0J8824yeDAX48gR5h8EOj75MoUN6vZICEthAsUT8