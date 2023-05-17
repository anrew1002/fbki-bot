from server_side_game import Game
from server_side_game import drawNewMatrix

from flask import Flask, render_template, request, jsonify, session
from flask_session import Session
from auth import Auth
from database import Database
from settings import TOKEN, MYSQL_PASS
import json
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
    db = Database()
    data = request.get_json()  # Get the JSON data from the request
    # Process the data or perform any other operations
    # print(data)
    # print(type(data))

    word = data.get('data')
    coordinates = data.get('coordinates')
    if not session.get("matrix"):
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
    valid = db.getWord(word)

    newMatrix = drawNewMatrix(matrix, coordinates)

    if (valid != ''):
        session['matrix'] = newMatrix
        if session.get("auth") and session['auth']:
            db.setLog(session["user_id"], word)
        return jsonify(valid != '', newMatrix)
    else:
        return jsonify(valid != '', matrix)


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
    db = Database()
    data = request.get_json()  # Get the JSON data from the request
    # Process the data or perform any other operations
    authPlugin = Auth()
    boolian = authPlugin.authenticate(data["userData"])["bool"]
    data = authPlugin.authenticate(data["userData"])["data"]

    # print(data["userData"])
    user_data = []
    if boolian:
        user_data = json.loads(data[2][5:])
        if db.is_registered_user(int(data["user_id"])):
            session['user_id'] = user_data["id"]
            session['auth'] = boolian
        else:
            boolian = False

    return jsonify(boolian, user_data)


if __name__ == "__main__":
    app.run(host='0.0.0.0')
