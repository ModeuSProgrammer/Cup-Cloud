const { Storage, Tariff, List, Task } = require('../models/models')
const jwt = require('jsonwebtoken')

class NoteController {
  async CreateNote(req, res, next) {
    try {
      const { title, date, text } = req.body
      const token = req.headers.authorization.split(' ')[1]
      const TDecoded = jwt.verify(token, process.env.SECRET_KEY)
      const storageData = await Storage.findOne({ where: { ID: TDecoded.storageID } })
      const tariffCheckTask = await Tariff.findOne({ where: { ID: storageData.tariffID } })

      const taskCheck = await Task.count({ where: { listID: TDecoded.listID } })
      const listCheck = await List.findOne({ where: { ID: TDecoded.listID } })
      listCheck.occupied = taskCheck
      await listCheck.save()
      if ((tariffCheckTask.countTask - listCheck.occupied) > 0) {
        const task = await Task.create({ title: title, text: text, date: date, statud: 1, listID: TDecoded.listID })
        const taskCheck = await Task.count({ where: { listID: TDecoded.listID } })
        const listCheck = await List.findOne({ where: { ID: TDecoded.listID } })
        listCheck.occupied = taskCheck
        await listCheck.save()
        return res.status(200).json({ message: 'Заметка создана' })
      }
      else {
        return res.status(200).json({ message: 'Нет свободных заметок' })
      }
    } catch (error) {
      return next(ApiError.internal('Ошибка работы диска'))
    }
  }
  async ShowsTasks(req, res) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const TDecoded = jwt.verify(token, process.env.SECRET_KEY)
      const tasks = await Task.findAll({
        where: { listID: TDecoded.listID },
        attributes: ['title', 'text', 'date', 'status']
      });
      return res.status(200).json(tasks)
    }
    catch (e) {
      return res.status(400).json({ message: 'Ошибка на сервере' })
    }
  }
}

module.exports = new NoteController() 
