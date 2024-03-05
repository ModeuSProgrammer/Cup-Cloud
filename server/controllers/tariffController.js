const { Storage, Tariff } = require('../models/models')

class TariffController {
  //изменение тарифа
  async setTariff(req, res) {
    try {
      const selectTariffID = req.body.tariffID
      const isValidTariff = await Tariff.findOne({ where: { ID: selectTariffID } })
      if (!isValidTariff) {
        return res.status(400).json({ message: 'Указан недопустимый номер тарифа' })
      }
      const storageData = await Storage.findOne({ where: { ID: req.user.storageID } })
      if (storageData.tariffID === selectTariffID) {
        return res.status(400).json({ message: 'Тариф уже был выбран' })
      }
      if (!selectTariffID) {
        return res.status(400).json({ message: 'Отсутствует номер тарифа в запросе' })
      }
      storageData.tariffID = selectTariffID
      storageData.datePay = new Date
      await storageData.save()
      return res.json(storageData.tariffID)
    } catch (error) {
      return res.status(400).json({ message: 'Ошибка выбора тарифа' })
    }
  }

  //получение тарифа
  async getTariff(req, res) {
    try {
      const storageData = await Storage.findOne({ where: { ID: req.user.storageID } })
      const tariffID = storageData.tariffID
      return res.json(tariffID)
    } catch (error) {
      console.error(error)
      console.log(storageData)
      return res.status(400).json({ message: 'Ошибка отображения тарифа' })
    }
  }
}
module.exports = new TariffController() 
