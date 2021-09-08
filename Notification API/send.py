import requests

data = {"data":{"msg":"Hello World"}}

result = requests.post('http://localhost:3000/notification', data= data)

print(result.text)