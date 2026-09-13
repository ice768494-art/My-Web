import sqlite3

DATABASE = "anime.db"


def create_database():
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS anime (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            rating REAL,
            audio TEXT,
            poster TEXT,
            description TEXT
        )
    """)

    connection.commit()
    connection.close()


def add_anime(name, rating, audio, poster, description):
    connection = sqlite3.connect(DATABASE)
    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO anime
        (name, rating, audio, poster, description)
        VALUES (?, ?, ?, ?, ?)
    """, (name, rating, audio, poster, description))

    connection.commit()
    connection.close()


create_database()

add_anime(
    "One Piece",
    8.9,
    "Tamil",
    "https://example.com/poster.jpg",
    "An adventure anime about Monkey D. Luffy and his crew."
)

print("Anime added successfully!")
