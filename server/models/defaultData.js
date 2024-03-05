const { Role, Tariff } = require('./models')
const defaultTariffs = [
  { ID: 1, placeCount: 15, price: 0, name: 'basic' },
  { ID: 2, placeCount: 200, price: 200, name: 'standard' },
  { ID: 3, placeCount: 500, price: 400, name: 'business' }
]

class defaultDataDB {
  async addDefaultDataRoles() {
    try {
      const existingRoles = await Role.findAll()
      if (existingRoles.length > 0) {
        return console.log('Роли уже существуют в таблице.')
      }
      await Role.create({ ID: 1, name: 'user' })
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
}

module.exports = new defaultDataDB() 