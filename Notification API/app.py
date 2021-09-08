from flask import Flask

app = Flask(__name__)

@app.route("/polling")
def hello_world():
    data = {"name":"Rajat","field":"computers"}
    return data