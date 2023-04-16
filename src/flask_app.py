from flask import Flask, render_template
app = Flask(__name__)


@app.route("/")
def hello():
    return render_template("profile.html")


@app.route("/game")
def game():
    return render_template("wordsearch.html")


if __name__ == "__main__":
    app.run(host='0.0.0.0')
