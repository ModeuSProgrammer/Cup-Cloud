const { Tariff } = require('../models/models');
// Базовые данные для тарифов
const defaultTariffs = [
  { ID: 1, placeCount: 15, price: 0, name: 'basic' },
  { ID: 2, placeCount: 200, price: 200, name: 'standard' },
  { ID: 3, placeCount: 500, price: 400, name: 'business' }
];
// Функция для создания тарифов в виде промиса
function createDefaultTariffs() {
  return new Promise(async (resolve, reject) => {
    try {
      // Проверяем, есть ли тарифы в базе данных
      const existingTariffs = await Tariff.findAll();

      // Если тарифы уже существуют, выходим из функции
      if (existingTariffs.length > 0) {
        console.log('Тарифы уже существуют в таблице.');
        resolve('Тарифы уже существуют в таблице.');
        return;
      }

      // Создаю тарифы, если их еще нет
      for (const tariffData of defaultTariffs) {
        await Tariff.create(tariffData);
      }

      console.log('Тарифы успешно добавлены в таблицу.');
      resolve('Тарифы успешно добавлены в таблицу.');
    } catch (error) {
      console.error('Ошибка при добавлении тарифов:', error.message);
      reject(error);
    }
  });
}

module.exports = { createDefaultTariffs };
