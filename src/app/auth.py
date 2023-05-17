from settings import TOKEN

import hmac
import hashlib
from urllib.parse import unquote
data_check_string = unquote('query_id=AAGcqlFKAAAAAJyqUUp6-Y62&user=%7B%22id%22%3A1246866076%2C%22first_name%22%3A%22Dante%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22S_User%22%2C%22language_code%22%3A%22en%22%7D&auth_date=1651689536&hash=de7f6b26aadbd667a36d76d91969ecf6ffec70ffaa40b3e98d20555e2406bfbb')


class Auth:
    def authenticate(self, userData):
        data_check_string = unquote(userData)
        data_check_arr = data_check_string.split('&')
        needle = 'hash='
        hash_item = ''
        telegram_hash = ''
        for item in data_check_arr:
            if item[0:len(needle)] == needle:
                telegram_hash = item[len(needle):]
                hash_item = item
        data_check_arr.remove(hash_item)
        data_check_arr.sort()
        data_check_string = "\n".join(data_check_arr)
        secret_key = hmac.new("WebAppData".encode(),
                              TOKEN.encode(),  hashlib.sha256).digest()
        calculated_hash = hmac.new(
            secret_key, data_check_string.encode(), hashlib.sha256).hexdigest()

        return {"bool": calculated_hash == telegram_hash, "data": data_check_arr}
        # return data_check_arr
