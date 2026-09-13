import sqlite3
from flask import Flask, jsonify

app = Flask(__name__)

DATABASE = "anime.db"


def get_anime():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row

    cursor = connection.cursor()
    cursor.execute("SELECT * FROM anime")

    anime = [dict(row) for row in cursor.fetchall()]

    connection.close()

    return anime


@app.route("/api/anime")
def anime_api():
    return jsonify(get_anime())


@app.route("/")
def home():
    return "Anime API is running!"


if __name__ == "__main__":
    app.run(debug=True)
