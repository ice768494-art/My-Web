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


if __name__ == "__main__":
    create_database()
    print("Database created successfully!")
