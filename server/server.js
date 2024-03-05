const express = require('express') // экспресс приложение
const cors = require('cors')  // библиотека для получение запросов
const fileUpload = require('express-fileupload')  // для файлов
const corsMiddleware = require('./middleware/corsMiddleware.js')
const dotenv = require('dotenv')  // конфиг
dotenv.config()  // Настройка переменных среды из файла .env

const sequelize = require('./models/DB.js')  //для подключения к бд
const models = require('./models/models.js')  //  таблицы бд(модели)

const router = require('./routes/index.js') // Routes для настройки маршрутов
const ErrorHandler = require('./middleware/ErrorHandlingMiddleware.js')  // для работы с ошибками

const defaultDataDB = require('./models/defaultData.js')

const app = express()  // создание экспресс приложения
app.use(fileUpload({
  defCharset: 'utf8',
  defParamCharset: 'utf8'
}))
app.use(corsMiddleware)  // для cors (механизм безопасности)
app.use(express.static('static'))
app.use(express.json())//Для обработки запросов json
app.use('/api', router)

//должен идти в самом конце обработчик ошибок
const port = process.env.PORT || 5000
const start = async () => {
  try {
    await sequelize.authenticate() //устанавливаем подключение к бд
    await sequelize.sync()
    await defaultDataDB.addDefaultDataRoles()
    await defaultDataDB.createDefaultTariffs()

    app.listen(port, () => {
      console.log(`Сервер запущен на порту ${port}`)
    })
  }
  catch (err) {
    console.log(err)
  }
}

start()