const { Storage, Tariff } = require('../models/models')
const jwt = require('jsonwebtoken')

class TariffController {
  //изменение тарифа
  async setTariff(req, res) {
    try {
      const selectTariffID = req.body.tariffID
      const check = await Storage.findOne({ where: { ID: req.user.storageID } })
      if (selectTariffID === check.tariffID) {
        return res.status(200).json({ message: 'Тариф уже был выбран' })
      }
      const isValidTariff = await Tariff.findOne({ where: { ID: selectTariffID } })
      if (!isValidTariff) {
        return res.status(200).json({ message: 'Указан недопустимый номер тарифа' })
      }
      const storageData = await Storage.findOne({ where: { ID: req.user.storageID } })
      if (!selectTariffID) {
        return res.status(200).json({ message: 'Отсутствует номер тарифа в запросе' })
      }
      storageData.tariffID = selectTariffID
      await storageData.save()
      const TID = storageData.tariffID
      return res.json({ TID, message: `Выбран тариф ${storageData.tariffID}` })
    } catch (error) {
      return res.status(400).json({ message: 'Ошибка на сервере' })
    }
  }

  //получение тарифа
  async getTariff(req, res) {
    try {
      const storageData = await Storage.findOne({ where: { ID: req.user.storageID } })
      const tariffID = storageData.tariffID
      return res.status(200).json({ tariffID })
    } catch (error) {
      console.error(error)
      return res.status(400).json({ message: 'Ошибка отображения тарифа' })
    }
  }
  // Для отображения блоков
  async FullTariffData(req, res) {
    try {
      const listTarrif = req.body.numList
      const tarrifData = await Tariff.findOne({ where: { ID: listTarrif } })
      const data = (tarrifData.dataValues)
      let ID = data.ID
      let placeCount = data.placeCount
      let price = data.price
      let name = data.name

      return res.status(200).json({ ID, placeCount, price, name })
    } catch (error) {
      console.error(error)
      return res.status(400).json({ message: 'Ошибка на сервере' })
    }
  }
  // Для отображения блоков
  async FullTariffData(req, res) {
    try {
      const listTarrif = req.body.numList
      const tarrifData = await Tariff.findOne({ where: { ID: listTarrif } })
      const data = (tarrifData.dataValues)
      let ID = data.ID
      let placeCount = data.placeCount
      let price = data.price
      let name = data.name

      return res.status(200).json({ ID, placeCount, price, name })
    } catch (error) {
      console.error(error)
      return res.status(400).json({ message: 'Ошибка на сервере' })
    }
  }

  // Для отображения в профиле 
  async DataUserTariff(req, res) {
    try {

      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      const storage = await Storage.findOne({ where: { ID: decoded.storageID } })
      const tarrifData = await Tariff.findOne({ where: { ID: storage.tariffID } })
      const data = (tarrifData.dataValues)
      let price = data.price

      return res.status(200).json({ price })
    } catch (error) {
      console.error(error)
      return res.status(400).json({ message: 'Ошибка на сервере' })
    }
  }
}
module.exports = new TariffController() 
