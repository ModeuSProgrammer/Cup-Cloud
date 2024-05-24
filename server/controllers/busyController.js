const { Storage, Tariff } = require('../models/models')

class BusyDataController {
  //для диаграммы
  async diagramsProcent(req, res, next) {
    try {
      const storageData = await Storage.findOne({ where: { ID: req.user.storageID } })
      const storageOccupied = storageData.occupied
      const tariffID = storageData.tariffID
      const tariffData = await Tariff.findOne({ where: { ID: tariffID } })
      const tariffSpace = tariffData.placeCount * 1024 * 1024 * 1024
      const procent = Math.round((storageOccupied * 100) / tariffSpace)
      if (storageData.occupied === null) {
        procent = 0
      }
      return res.json(procent)
    } catch (error) {
      console.error(error)
      return res.json('Ошибка отображения')
    }
  }


  //для отображения места на диске
  async DiskOccupied(req, res, next) {
    try {
      const storageData = await Storage.findOne({ where: { ID: req.user.storageID } })
      const occupied = storageData.occupied

      const tariffData = await Tariff.findOne({ where: { ID: storageData.tariffID } })
      const TDOccupied = Number(tariffData.placeCount)

      if (storageData.occupied === null) {
        occupied = 0
      }
      let i = 0
      let placeCountGB = Number(storageData.occupied)
      while (placeCountGB / 1024 && i < 3) {
        placeCountGB = placeCountGB / 1024
        i++
      }
      return res.json({ placeCountGB, TDOccupied })
    } catch (error) {
      console.error(error)
      return res.json('Ошибка отображения занятого места на диске')
    }
  }
}
module.exports = new BusyDataController() 
