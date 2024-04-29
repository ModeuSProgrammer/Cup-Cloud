const { Role, Tariff, User, Storage, Profile, List } = require('./models')
const bcrypt = require('bcrypt')  // для хеширование паролей
const defaultTariffs = [
  { ID: 1, placeCount: 15, price: 0, name: 'Стандартный', countTask: 15 },
  { ID: 2, placeCount: 200, price: 200, name: 'Профессиональный', countTask: 30 },
  { ID: 3, placeCount: 500, price: 400, name: 'Бизнес', countTask: 70 }
]
const defaultRole = [
  { ID: 1, name: 'user' },
  { ID: 2, name: 'admin' }]
class defaultDataDB {
  async addDefaultDataRoles() {
    try {
      const existingRoles = await Role.findAll()
      if (existingRoles.length > 0) {
        return console.log('Роли уже существуют в таблице.')
      }
      for (const role of defaultRole) {
        await Role.create(role)
      }
      return console.log('Роль успешно добавлена в таблицу.')
    }
    catch (e) {
      return console.log(e)
    }
  }
  async createDefaultTariffs() {
    try {
      const existingTariffs = await Tariff.findAll()
      if (existingTariffs.length > 0) {
        return console.log('Тарифы уже существуют в таблице.')
      }
      for (const tariffData of defaultTariffs) {
        await Tariff.create(tariffData)
      }
      return console.log('Тарифы успешно добавлены в таблицу.')
    }
    catch (e) {
      return console.log(e)
    }
  }
  async baseAdmin() {
    try {
      const existingUsers = await User.findAll({ where: { roleID: 2 } })
      if (existingUsers.length > 0) {
        return console.log('Администраторы есть на сервере')
      }
      else {
        const pass = await bcrypt.hash('admin', 5)
        const profile = await Profile.create()
        const storage = await Storage.create({ occupied: 0, status: true, datePay: new Date(), tariffID: 1 })
        const lists = await List.create({ storageID: storage.ID })
        const admin = await User.create({ email: "admin@admin.ru", password: pass, firstname: 'admin', roleID: 2, storageID: storage.ID, profileID: profile.ID })
        return console.log('Базовый администратор создан')
      }
    }
    catch (e) {
      return console.log(e)
    }
  }
}
module.exports = new defaultDataDB() 
