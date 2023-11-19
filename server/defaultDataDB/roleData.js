const { Role } = require('../models/models');

// Базовые данные для ролей
async function addDefaultDataRoles() {
  try {
    // Проверяем, есть ли роли в базе данных
    const existingRoles = await Role.findAll();

    // Если роли уже существуют, выходим из функции
    if (existingRoles.length > 0) {
      console.log('Роли уже существуют в таблице.');
      return;
    }

    // Создаем роль, если ее еще нет
    await Role.create({ ID: 1, name: 'user' });

    console.log('Роль успешно добавлена в таблицу.');
  } catch (error) {
    console.error('Ошибка при добавлении роли:', error.message);
  }
}

// Вызываем функцию для добавления роли
addDefaultDataRoles();
