import time
import logging
from aiogram import Bot, Dispatcher, executor, types

from database import Database
from settings import TOKEN, MYSQL_PASS

bot = Bot(token=TOKEN)
dpatch = Dispatcher(bot=bot)

mydb = Database(
    host="localhost",
    user="telegram_bot",
    password=MYSQL_PASS,
    database="dev_fbki_app"
)


@dpatch.message_handler(commands=['start'])
async def start_handler(message: types.Message):
    user_id = message.from_user.id
    user_full_name = message.from_user.full_name

    await message.answer(f"Привет,{user_full_name}\nЭто бот для студенов ФбКиИ. Когда тебе станет скучно на парах, можешь зайти поиграть в нашу интегрированую в Telegram игру.")

    if mydb.is_registered_user(user_id) == 0:
        await message.answer("Провожу регистрацию...")
        mydb.insert_user(user_id, user_full_name)
        await message.answer("Укажите группу обучения на факультете:")

        await message.answer("Регистрация завершена! /profile")

    else:
        await message.answer(
            f"Кажется ты уже зарегестрирован,{user_full_name}. На данный момент функционал бота исчерпан")


@dpatch.message_handler(commands=['profile'])
async def start_handler(message: types.Message):
    await message.answer(
        f"Твой ник: {mydb.get_nickname(message.from_user.id)}")


if __name__ == "__main__":
    executor.start_polling(dpatch)
