# Node REST API

Цей проект є реалізацією REST API на базі Express.js. 
API підтримує авторизацію через JWT, роботу з користувачами та постами, 
а також можливість створювати, редагувати та видаляти.

## Технології

- Node.js
- Express.js
- MongoDB
- JWT (JSON Web Tokens)
- Mongoose
- dotenv для управління змінними середовища

## Встановлення

1. Клонуйте репозиторій:
   git clone https://github.com/Vtorenko25/Node.Rest.Api.git
2. cd Node.Rest.Api
3. npm install
4. Створіть файл .env у корені проекту та налаштуйте його:
PORT=
MONGO_DB_URL=
JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRES_IN=
JWT_REFRESH_SECRET=
JWT_REFRESH_EXPIRES_IN=

Проект запустить сервер на порту, вказаному в .env файлі (за замовчуванням — порт 3000).

## Запуск проекту

npm run start:dev

## Перевірити код на помилки

npm run lint

## Документація API

Документація API доступна за адресою:

👉 http://localhost:3000/docs/

Перейдіть за цим посиланням після запуску сервера, щоб переглянути список доступних ендпоінтів.


REST API
1. Реєстрація користувача
   POST /auth/sign-up
   Опис: Реєстрація нового користувача.
   Тіло запиту:
   {
   "name": "John Doe",
   "email": "john.doe@example.com",
   "password": "password123",
   "age": 25,
   "phone": "+380631111111"
   }
2. Авторизація користувача
   POST /auth/sign-in
   Опис: Авторизація користувача з отриманням JWT токена.
   Тіло запиту:
   {
   "email": "john.doe@example.com",
   "password": "password123"
   }
3. Вихід користувача
   POST /auth/log-out
   Опис: (необхідна авторизація через JWT)
4. Отримати список всіх user
   GET /users/
5. Фільтрація користувача по імені
   GET users?name=john
   Опис: (необхідна авторизація через JWT)
6. Фільтрація користувача по email
   GET users?email=Johnfffddf@gmail.com
   Опис: (необхідна авторизація через JWT)
7. Фільтрація користувача по age
   GET users?age=25
   Опис: (необхідна авторизація через JWT)
8. Фільтрація користувача по phone
   GET users?phone=1234567890
   Опис: (необхідна авторизація через JWT)
9. Пошук користувача по id
   GET users/:id
   Опис: (необхідна авторизація через JWT)
10. Пошук користувача по email
   GET users/:email
   Опис: (необхідна авторизація через JWT)
11. Оновлення користувача:
   PUT users/me
   Опис: (необхідна авторизація через JWT)
   {
   "name": "John Doe",
   "age": 25
   }
12. Видалення користувача
    DELETE users/me
    Опис: (необхідна авторизація через JWT)
13. Отримання всіх постів
    GET posts/
14. Створення поста
      POST /posts/create
      Опис: Створення нового поста (необхідна авторизація через JWT).
      Тіло запиту:
    {
    "title": "Hello world",
    "content": "Hello world"
    }
15. Оновлення поста:
    PUT posts/me
    Опис: (необхідна авторизація через JWT)
    {
    "title": "Hello world",
    "content": "Hello world"
    }
16. Видалення поста
    DELETE posts/me
    Опис: (необхідна авторизація через JWT)