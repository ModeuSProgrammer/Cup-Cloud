const ApiError = require('../error/ApiError');
const path = require('path');
const { Storage, File } = require('../models/models');
const fs = require('fs').promises;
const createDirMiddleware = require('../middleware/createDirMiddleware');
const { NUMBER } = require('sequelize');

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
        await parentFile.save();
      }
      await file.save()
      return res.json(file)
    }
    catch (error) {
      console.error(error);
      return next(ApiError.internal('Ошибка добавления файла'));
    }
  }
}

module.exports = new StorageController();
