import mysql.connector
from settings import MYSQL_PASS


class Database():
    def __init__(self,
                 password=MYSQL_PASS,
                 user="telegram_bot",
                 database="dev_fbki_app",
                 host="localhost"
                 ) -> None:
        self.db = mysql.connector.connect(
            password=password, user=user, database=database, host=host)
        self.cursor = self.db.cursor(dictionary=True)

    def __new__(cls):
        if not hasattr(cls, 'instance'):
            cls.instance = super(Database, cls).__new__(cls)
        return cls.instance

    def get_nickname(self, user_id):
        sql = f"SELECT * FROM users WHERE id =%s LIMIT 1"
        self.cursor.execute(sql, [user_id])
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

    def getWord(self, word):
        sql = f"SELECT word FROM dictionary WHERE word =%s LIMIT 1"
        self.cursor.execute(sql, [word])
        result_select = self.cursor.fetchone()
        print(result_select)
        if not result_select:
            return ""
        return result_select['word']

    def setLog(self, user_id, word):
        sql = f"INSERT INTO logs (user_id,word) VALUES(%s,%s)"
        self.cursor.execute(sql, [user_id, word])
        self.db.commit()

    def getTops(self):
        sql = "SELECT users.nickname, l.word , LENGTH(l.word) as `len` FROM `logs` as l JOIN users ON users.id = l.user_id ORDER BY `len` DESC LIMIT 10;"
        self.cursor.execute(sql)
        result_select = self.cursor.fetchall()
        print(result_select)
        if not result_select:
            return ""
        return result_select
