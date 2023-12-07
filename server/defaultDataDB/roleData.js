const { Role } = require('../models/models')
// Базовые данные для ролей
function addDefaultDataRoles() {
  return new Promise(async (resolve, reject) => {
    try {
      // Проверяем, есть ли роли в базе данных
      const existingRoles = await Role.findAll()

      // Если роли уже существуют, выходим из функции
      if (existingRoles.length > 0) {
        console.log('Роли уже существуют в таблице.')
        resolve('Роли уже существуют в таблице.')
        return
      }

      // Создаем роль, если ее еще нет
      await Role.create({ ID: 1, name: 'user' })

      console.log('Роль успешно добавлена в таблицу.')
      resolve('Роль успешно добавлена в таблицу.')
    } catch (error) {
      console.error('Ошибка при добавлении роли:', error.message)
      reject(error)
    }
  })
}
module.exports = { addDefaultDataRoles } 
