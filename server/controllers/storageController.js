const ApiError = require('../error/ApiError');
const path = require('path');
const { Storage, File } = require('../models/models');
const fs = require('fs').promises;
const createDirMiddleware = require('../middleware/createDirMiddleware');

class StorageController {
  async createDir(req, res, next) {
    try {
      const { name, type, parentID } = req.body;
      const file = new File({ name, type, parentID, storageID: req.user.storageID });
      console.log(req.user);
      let parentFile = null;
      if (parentID) {
        parentFile = await File.findByPk(parentID);
        if (!parentFile) {
          return next(ApiError.internal('Родительский файл не найден'));
        }
        file.path = path.join(parentFile.path, name);
        await createDirMiddleware.createDirServices(file);

        parentFile.child.push(file.ID);
        await parentFile.save();
      }

      else {
        if (!req.user.dirMain) {
          return next(ApiError.internal('Отсутствует информация о корневой директории пользователя'));
        }
        const userRootPath = path.join(req.user.dirMain);
        file.path = path.join(userRootPath, name);
        await createDirMiddleware.createDirServices(file);
      }
      await file.save();
      return res.json(file);
    } catch (error) {
      console.error(error);
      return next(ApiError.internal('Ошибка добавления файла'));
    }
  }
}
module.exports = new StorageController();
