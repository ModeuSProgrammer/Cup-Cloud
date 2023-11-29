const express = require('express');// экспресс приложение
const cors = require('cors'); // библиотека для получение запросов
const dotenv = require('dotenv'); // конфиг
dotenv.config(); // Настройка переменных среды из файла .env

const sequelize = require('./models/DB.js'); //для подключения к бд
const models = require('./models/models.js'); //  таблицы бд(модели)

const router = require('./routes/index.js');// Routes для настройки маршрутов
const ErrorHandler = require('./middleware/ErrorHandlingMiddleware.js'); // для работы с ошибками
const corsMiddleware = require('./middleware/corsMiddleware.js')

const defaultRole = require('./defaultDataDB/roleData.js'); //добавление базовых данынх для таблицы Role
const defaultTariff = require('./defaultDataDB/tariffData.js'); //добавление базовых данынх для таблицы Tariff

const app = express(); // создание экспресс приложения
app.use(corsMiddleware); // для cors (механизм безопасности)
app.use(express.json())//Для обработки запросов json
app.use('/api/CupCloud', router);

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

const initializeData = async () => {
  try {
    await defaultRole.addDefaultDataRoles();
    await defaultTariff.createDefaultTariffs();
  }
  catch (error) {
    console.error('Ошибка инициализации данных:', error.message);
    throw error;
  }
}
// добавление данных для нормальной работы бд и приложения
const runApp = async () => {
  try {
    await sequelize.sync();
    await initializeData();
    await start();
  } catch (error) {
    console.error('Ошибка при запуске:', error.message);
  }
};

runApp();