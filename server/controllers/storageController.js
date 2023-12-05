const ApiError = require('../error/ApiError');
const { Storage, File, Tariff } = require('../models/models');
const path = require('path');
const fs = require('fs');
const createDirMiddleware = require('../middleware/createDirMiddleware');
const DeleteMiddleware = require('../middleware/DeleteMiddleware');

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
      const file = req.files.file;
      const parentID = req.body.parentID;
      const parent = parentID ? await File.findOne({ where: { ID: parentID } }) : null;
      const storage = await Storage.findOne({ where: { ID: req.user.storageID } });
      // Проверка места на диске в зависимости от тарифа
      const tariffID = storage.tariffID;
      const tariffData = await Tariff.findOne({ where: { ID: tariffID } });

      if (parseInt(storage.occupied) + parseInt(file.size) > (tariffData.placeCount * 1024 * 1024 * 1024)) {
        return res.status(400).json('Не хватает свободного места на диске');
      }

      storage.occupied = parseInt(storage.occupied) + parseInt(file.size);
      let filePath;
      let pathFile;
      // Проверка пути
      if (parent && parent.path !== null) {
        filePath = path.join(process.env.filePath, parent.path, file.name);
        pathFile = path.join(parent.path, file.name);
        console.log(filePath);
      } else {
        filePath = path.join(process.env.filePath, req.user.dirMain, file.name);
        pathFile = path.join(req.user.dirMain, file.name);
      }
      // Проверка существует ли файл по такому пути
      if (fs.existsSync(filePath)) {
        return res.status(400).json('Файл по такому пути уже существует');
      }
      // Перемещаем файл
      await file.mv(filePath, (err) => {
        if (err) {
          console.error('Error moving the file:', err);
          return res.status(500).json('Internal Server Error');
        }
      });
      // Получаем информацию о файле и загружаем его в базу данных
      const type = file.name.split('.').pop();
      const dbFile = new File({
        name: file.name,
        type,
        size: file.size,
        path: pathFile || null,
        parentID: parent?.ID || null,
        storageID: storage.ID
      });

      await dbFile.save();
      await storage.save();

      return res.json(dbFile);
    } catch (error) {
      console.error(error);
      return next(ApiError.internal('Ошибка загрузки файла'));
    }
  }

  //для скачиваня файлов
  async downloadFile(req, res, next) {
    try {
      const file = await File.findOne({ where: { ID: req.query.ID, storageID: req.user.storageID } })
      const filepath = path.join(process.env.filePath, file.path);
      if (fs.existsSync(filepath)) {
        return res.download(filepath);
      }
      return res.status(400).json('Ошибка скачивания файла');
    } catch (error) {
      console.error(error);
      return next(ApiError.internal('Ошибка скачивания файла'));
    }
  }

  //для удаления файлов
  async deleteFile(req, res, next) {
    try {
      const file = await File.findOne({ where: { ID: req.query.ID, storageID: req.user.storageID } })
      if (!file) {
        return res.status(400).json('Файл не был найден');
      }
      await DeleteMiddleware.deleteFile(file);
      await file.destroy();
      return res.json('Файл был удален');

    } catch (error) {
      console.error(error);
      return res.json('Ошибка удаления файла, папка не пустая');
    }
  }


  //для поиска файлов
  async searchFile(req, res, next) {
    try {
      const searchName = req.query.search
      let files = await File.findAll({ where: { storageID: req.user.storageID } });
      files = files.filter(file => file.name.includes(searchName))
      return res.json(files)
    } catch (error) {
      console.error(error);
      return next(ApiError.internal('Ошибка поиска файла'));
    }
  }
}



module.exports = new StorageController();
