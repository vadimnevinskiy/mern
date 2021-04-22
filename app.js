const express = require('express')// Подключаем express
const config = require('config') //Получили конфиг
const mongoose = require('mongoose')//База данных

const app =  express() //Функция express() - будующий сервер

app.use('/api/auth', require('./routes/auth.routes'))

const PORT = config.get('port') || 5000 //Создали переменную PORT и если не найден в файле default.json то  по умолчанию порт 5000

//Соединение с сервером
async function start() {
    try {// Попытка соединения
        await mongoose.connect(config.get('mongoUri')), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }
        app.listen(PORT, () => { // После подключения к бд стартуем сервер
            console.log(`App has been started on port ${PORT}!`) //Выведем порт в консоль
        })
    } catch (e) {// Если какая-то ошибка при подключении
        console.log("Server Error", e.message) //выведем в лог ошибку
        process.exit(1) //Завершим подключение
    }
}

start()

