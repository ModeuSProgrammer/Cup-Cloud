const { Storage, Tariff, List } = require('../models/models')
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

      const storageDataSelect = await Storage.findOne({ where: { ID: req.user.storageID } })
      if (storageDataSelect.tariffID === selectTariffID) {
        return res.status(200).json({ message: 'Тариф уже был выбран' })
      }

      const storageData = await Storage.findOne({ where: { ID: req.user.storageID } })
      if (!selectTariffID) {
        return res.status(200).json({ message: 'Отсутствует номер тарифа в запросе' })
      }
      storageData.tariffID = selectTariffID
      storageData.datePay = new Date
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
      let countTask = data.countTask
      return res.status(200).json({ ID, placeCount, price, name, countTask })
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
      console.log(decoded)
      const data = (tarrifData.dataValues)
      let price = data.price
      let countTask = data.countTask
      let dataList = await List.findByPk(decoded.listID)
      let occupiedTask = dataList.occupied
      return res.status(200).json({ price, countTask, occupiedTask })
    } catch (error) {
      console.error(error)
      return res.status(400).json({ message: 'Ошибка на сервере' })
    }
  }

  // Для отображения блоков
  async AdminChangeTariff(req, res) {
    try {
      const btnNum = Number(req.body.btnNum)
      const { GB, task, price } = req.body
      if (btnNum != 0) {
        if (GB != undefined && GB != 0 && GB.length != 0) {
          const cell = await Tariff.findOne({ where: { ID: btnNum } })
          cell.placeCount = Number(GB)
          await cell.save()
        }
        if (task != undefined && task != 0 && task.length != 0) {
          const cell = await Tariff.findOne({ where: { ID: btnNum } })
          cell.countTask = Number(task)
          await cell.save()
        }
        if (price != undefined && price.length != 0) {
          const cell = await Tariff.findOne({ where: { ID: btnNum } })
          cell.price = Number(price)
          await cell.save()
        }
      }
      return res.status(200).json({ message: "Изменения прошли успешно" })
    } catch (error) {
      console.error(error)
      return res.status(400).json({ message: 'Ошибка на сервере' })
    }
  }
}
module.exports = new TariffController() 
