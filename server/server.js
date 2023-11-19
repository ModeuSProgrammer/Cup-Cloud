const express = require('express');// экспресс приложение
const dotenv = require('dotenv'); // конфиг
dotenv.config(); // Настройка переменных среды из файла .env
const sequelize = require('./models/DB.js'); //для подключения к бд
const models = require('./models/models.js'); //  таблицы бд(модели)
const cors = require('cors'); // библиотека для получение запросов
const router = require('./routes/index.js');// Routes для настройки маршрутов
const ErrorHandler = require('./middleware/ErrorHandlingMiddleware.js'); // для работы с ошибками
const path = require('path'); // для файлов
const multer = require('multer');// для файлов


const defaultRole = require('./defaultDataDB/roleData.js'); //добавление базовых данынх для таблицы Role
const defaultTariff = require('./defaultDataDB/tariffData.js'); //добавление базовых данынх для таблицы Tariff

const app = express(); // создание экспресс приложения
app.use(cors());// для получение запросов из браузера
app.use(express.json())//Для обработки запросов json

app.use('/api', router);

//должен идти в самом концеЮ обработчик ошибок
const port = process.env.PORT || 5000;


const start = async () => {
  try {
    await sequelize.authenticate();//устанавливаем подключение к бд
    await sequelize.sync();
    app.listen(port, () => {
      console.log(`Сервер запущен на порту ${port}`);
    });
  }
  catch (err) {
    console.log(err)
  }
};

start();