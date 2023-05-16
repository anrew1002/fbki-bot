from flask import Flask, render_template, request, jsonify
from app.auth import Auth
app = Flask(__name__)


@app.route("/")
def hello():
    return render_template("profile.html")


@app.route("/game")
def game():
    return render_template("wordsearch.html")


@app.route("/api", methods=['POST'])
def api():
    data = request.get_json()  # Get the JSON data from the request
    # Process the data or perform any other operations
    result = {'message': 'Data received successfully'}
    return jsonify(result, data)


@app.route("/auth", methods=['POST'])
def auth():
    data = request.get_json()  # Get the JSON data from the request
    # Process the data or perform any other operations
    authPlugin = Auth()
    boolian = authPlugin.authenticate(data["userData"])
    print(data["userData"])
    return jsonify(boolian, data)


if __name__ == "__main__":
    app.run(host='0.0.0.0')
