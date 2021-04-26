const express = require('express')// Подключаем express
const config = require('config') //Получили конфиг
const path = require('path')
const mongoose = require('mongoose')//База данных

const app =  express() //Функция express() - будующий сервер
app.use(express.json({ extended: true }))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/links', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

//Проверим, если системная переменная NODE_ENV = 'production'
if(process.env.NODE_ENV === 'production') {
    // Подключим папку buld из react приложения
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    //Любой запрос в production режиме
    app.get('*', (req, res) => {
        // Отдает файл index.html в папке client/build/index.html
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = config.get('port') || 5000 //Создали переменную PORT и если не найден в файле default.json то  по умолчанию порт 5000

//Соединение с сервером
async function start() {
    // Попытка соединения
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => { // После подключения к бд стартуем сервер
            console.log(`App has been started on port ${PORT}!`) //Выведем порт в консоль
        })
    } catch (e) {// Если какая-то ошибка при подключении
        console.log("Server Error", e.message) //выведем в лог ошибку
        process.exit(1) //Завершим подключение
    }
}

start()

