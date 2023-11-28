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
      const parentFile = parentID !== undefined ? await File.findOne({ where: { ID: parentID } }) : null;
      if (!parentFile) {
        file.path = `${req.user.dirMain}\\${file.name}`;
        await createDirMiddleware.createDirServices(file)
      } else {
        file.path = `${parentFile.path}\\${file.name}`;
        await createDirMiddleware.createDirServices(file)
        if (!parentFile.childID) {
          parentFile.childID = [];
        }
        parentFile.childID.push(file.ID);
        await parentFile.save()
      }
      await file.save()
      return res.json(file)
    }
    catch (error) {
      console.error(error);
      return next(ApiError.internal('Ошибка добавления файла'));
    }
    // if (parentID) {
    //   parentFile = await File.findByPk(parentID);
    //   if (!parentFile) {
    //     return next(ApiError.internal('Родительский файл не найден'));
    //   }

    //   file.path = path.join(parentFile.path, name);
    //   await createDirMiddleware.createDirServices(file);

    //   parentFile.childID.push(file.ID);
    //   await parentFile.save();
    // } else {
    //   if (!req.user.dirMain) {
    //     return next(ApiError.internal('Отсутствует информация о корневой директории пользователя'));
    //   }

    //   const userRootPath = path.join(req.user.dirMain);
    //   file.path = path.join(userRootPath, name);
    //   await createDirMiddleware.createDirServices(file);
    // }
  }
}

module.exports = new StorageController();
