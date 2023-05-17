from server_side_game import Game

from flask import Flask, render_template, request, jsonify, session
from flask_session import Session
from auth import Auth
app = Flask(__name__)
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_COOKIE_NAME'] = 'wordsearchgame'
Session(app)
# game = Game()
# matrix = []


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
    print(data)
    print(type(data))

    word = data.get('data')
    coordinates = data.get('coordinates')
    if not session.get("name"):
        return jsonify({"message": 'get matrix first'})
    matrix = session['matrix']

    if len(coordinates) == 0:
        result = {'message': 'Data received unsuccessfully'}
        return jsonify(result, data)
    for i in range(0, len(coordinates)):
        x = coordinates[i][0]
        y = coordinates[i][1]
        if matrix[x][y] != word[i]:
            result = {'message': 'Data received unsuccessfully'}
            return jsonify(result, data)

    result = {'message': 'Data received successfully'}
    return jsonify(result, data)


@app.route("/matrix", methods=['POST'])
def api_get():
    data = request.get_json()  # Get the JSON data from the request
    # Process the data or perform any other operations
    game = Game()
    matrix = game.matrix
    session['matrix'] = matrix
    return jsonify(matrix)


@app.route("/auth", methods=['POST'])
def auth():
    data = request.get_json()  # Get the JSON data from the request
    # Process the data or perform any other operations
    authPlugin = Auth()
    boolian = authPlugin.authenticate(data["userData"])
    # print(data["userData"])
    return jsonify(boolian, data)


if __name__ == "__main__":
    app.run(host='0.0.0.0')
