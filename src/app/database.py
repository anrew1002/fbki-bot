import mysql.connector


class Database():
    def __init__(self,
                 password="user2020",
                 user="telegram_bot",
                 database="dev_fbki_app",
                 host="localhost"
                 ) -> None:
        self.db = mysql.connector.connect(
            password=password, user=user, database=database, host=host)
        self.cursor = self.db.cursor(dictionary=True)

    def get_nickname(self, user_id):
        sql = f"SELECT * FROM users WHERE id ={user_id} LIMIT 1"
        self.cursor.execute(sql)
        result_select = self.cursor.fetchall()
        if not result_select:
            return ""
        return result_select[0]["nickname"]

    def is_registered_user(self, user_id):
        return len(self.get_nickname(user_id)) != 0

    def insert_user(self, user_id, nickname: str) -> None:
        sql = "INSERT INTO users (id,nickname) VALUES (%s, %s)"
        val = (user_id, nickname)
        self.cursor.execute(sql, val)
        self.db.commit()
