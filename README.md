# Node REST API

Цей проект є реалізацією REST API на базі Node.js та Express.js. 
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
5. Для запуску сервера в режимі розробки:
npm run watch:server
Ця команда запустить сервер на порту, вказаному в .env файлі (за замовчуванням — порт 3000).


API
1. Реєстрація користувача
   POST /auth/sign-up
   Опис: Реєстрація нового користувача.
   Тіло запиту:
   {
   "name": "John Doe",
   "email": "john.doe@example.com",
   "password": "password123",
   "age": 25
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
   GET users?email=john@example.com
   Опис: (необхідна авторизація через JWT)
7. Пошук користувача по id
   GET users/:id
   Опис: (необхідна авторизація через JWT)
8. Пошук користувача по email
   GET users/:email
   Опис: (необхідна авторизація через JWT)
9. Оновлення користувача:
   PUT users/me
   Опис: (необхідна авторизація через JWT)
   {
   "name": "John Doe",
   "age": 25
   }
10. Видалення користувача
    DELETE users/me
    Опис: (необхідна авторизація через JWT)
11. Отримання всіх постів
    GET posts/
12. Створення поста
      POST /posts/create
      Опис: Створення нового поста (необхідна авторизація через JWT).
      Тіло запиту:
    {
    "title": "Hello world",
    "content": "Hello world"
    }
13. Оновлення поста:
    PUT posts/me
    Опис: (необхідна авторизація через JWT)
    {
    "title": "Hello world",
    "content": "Hello world"
    }
14. Видалення поста
    DELETE posts/me
    Опис: (необхідна авторизація через JWT)