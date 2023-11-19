const { Tariff } = require('../models/models');

// Базовые данные для тарифов
const defaultTariffs = [
  { ID: 1, placeCount: 15, price: 0, name: 'basic' },
  { ID: 2, placeCount: 200, price: 200, name: 'standard' },
  { ID: 3, placeCount: 500, price: 400, name: 'business' }
];

// Асинхронная функция для создания тарифов
async function createDefaultTariffs() {
  try {
    // Проверяем, есть ли тарифы в базе данных
    const existingTariffs = await Tariff.findAll();

    // Если тарифы уже существуют, выходим из функции
    if (existingTariffs.length > 0) {
      console.log('Тарифы уже существуют в таблице.');
      return;
    }

    // Создаю тарифы, если их еще нет
    for (const tariffData of defaultTariffs) {
      await Tariff.create(tariffData);
    }

    console.log('Тарифы успешно добавлены в таблицу.');
  } catch (error) {
    console.error('Ошибка при добавлении тарифов:', error.message);
  }
}

// Вызываем функцию для создания тарифов
createDefaultTariffs();
