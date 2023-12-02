const ApiError = require('../error/ApiError');
const { Storage, File, Tariff } = require('../models/models');
const fs = require('fs');
const createDirMiddleware = require('../middleware/createDirMiddleware');

class StorageController {
  async createDir(req, res, next) {
    try {
      const { name, type, parentID } = req.body;
      const file = new File({ name, type, parentID, storageID: req.user.storageID });
      const parentFile = parentID !== undefined ? await File.findOne({ where: { ID: parentID } }) : null;
      if (!parentFile) {
        file.path = `${req.user.dirMain}\\${file.name}`;
        await createDirMiddleware.createDirServices(file);
      } else {
        file.path = `${parentFile.path}\\${file.name}`;
        await createDirMiddleware.createDirServices(file);
        await parentFile.save();
      }
      await file.save();
      return res.json(file);
    }
    catch (error) {
      console.error(error);
      return next(ApiError.internal('Ошибка добавления файла'));
    }
  }

  //для отображение файлов по имени папок
  async getFiles(req, res, next) {
    try {
      const { parentID } = req.query;
      const files = parentID ? await File.findAll({ where: { storageID: req.user.storageID, parentID: req.query.parentID } })
        : await File.findAll({ where: { storageID: req.user.storageID, parentID: null } });

      return res.json(files);
    } catch (error) {
      console.error(error);
      return next(ApiError.internal('Ошибка отображения файла'));
    }
  }


  //для загрузки файлов
  async uploadFile(req, res, next) {
    try {
      const file = req.files.file
      const parent = await File.findOne({ _ID: req.user.parentID });
      const storage = await Storage.findOne({ where: { ID: req.user.storageID } })
      //поиск сколько положенно всего свободного места для пользователя
      const tariffID = storage.tariffID;
      const tariffData = await Tariff.findOne({ where: { ID: tariffID } })

      // проверка места на диске в зависимости от тарифа
      if (parseInt(storage.occupied) + parseInt(file.size) > (tariffData.placeCount * 1024 * 1024 * 1024)) {
        return res.status(400).json('Не хватает свободного места на диске');
      }

      storage.occupied = parseInt(storage.occupied) + parseInt(file.size);
      let path;
      //проверка пути
      if (parent) {
        path = `${process.env.filePath}\\${req.user.dirMain}\\${parent.path}${file.name}`;
        console.log(path);
      } else {
        path = `${process.env.filePath}\\${req.user.dirMain}\\${file.name}`;
      }
      // проверка существует ли файл по такому пути
      if (fs.existsSync(path)) {
        return res.status(400).json('Файл по такому пути уже существует');
      }
      // перемещаем файл
      file.mv(path)
      //получаем инфоромацию о файле и загрузка его в бд ит.д
      const type = file.name.split('.').pop()
      const dbFile = new File({
        name: file.name,
        type,
        size: file.size,
        path: parent?.path,
        parentID: parent?._ID,
        storageID: storage._ID
      })
      await dbFile.save()
      await storage.save()

      return res.json(dbFile);
    } catch (error) {
      console.error(error);
      return next(ApiError.internal('Ошибка загрузки файла'));
    }
  }

}


module.exports = new StorageController();
