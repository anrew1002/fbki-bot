import time
import logging
from aiogram import Bot, Dispatcher, executor, types
from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup

from app.database import Database
from app.settings import TOKEN, MYSQL_PASS

bot = Bot(token=TOKEN)
dpatch = Dispatcher(bot=bot)
# game_btn=InlineKeyboardButton(text='Играть',login_url='')

mydb = Database(
    # host="localhost",
    # user="telegram_bot",
    # password=MYSQL_PASS,
    # database="dev_fbki_app"
)


@dpatch.message_handler(commands=['start'])
async def start_handler(message: types.Message):
    user_id = message.from_user.id
    user_full_name = message.from_user.full_name

    await message.answer(f"Привет,{user_full_name}\nЭто бот для студенов ФбКиИ. Когда тебе станет скучно на парах, можешь зайти поиграть в нашу интегрированую в Telegram игру.")

    if mydb.is_registered_user(user_id) == 0:
        await message.answer("Провожу регистрацию...")
        mydb.insert_user(user_id, user_full_name)
        await message.answer("Регистрация завершена! /profile /top")

    else:
        await message.answer(
            f"Кажется ты уже зарегестрирован,{user_full_name}")


@dpatch.message_handler(commands=['profile'])
async def start_handler(message: types.Message):
    await message.answer(
        f"Твой ник: {mydb.get_nickname(message.from_user.id)}")


@dpatch.message_handler(commands=['top'])
async def top_handler(message: types.Message):
    text_answer = ''
    for member in mydb.getTops():
        text_answer += "\n" + f" ⨯ { member['nickname'] } - {member['word']} "

    await message.answer(
        f"Лучшие из лучших: {text_answer}")
    pass


if __name__ == "__main__":
    executor.start_polling(dpatch)
