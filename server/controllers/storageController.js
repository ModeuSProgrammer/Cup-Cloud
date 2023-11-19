const ApiError = require('../error/ApiError');
const path = require('path');
const multer = require('multer');
const { File } = require('../models/models');
const fs = require('fs').promises;

class StorageController {
  async AddFile(req, res, next) {
    try {
      const userID = req.user.ID;
      const userDir = path.join(__dirname, '..', 'files', `user${userID}`);

      // Проверка создана ли директория
      try {
        await fs.access(userDir);
      } catch (err) {
        // Если директория не существует, создаем её
        await fs.mkdir(userDir);
      }

      const storage = multer.diskStorage({
        destination: userDir,
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const fileName = `${uniqueSuffix}-${file.originalname}`;
          cb(null, fileName);
        },
      });

      const upload = multer({ storage }).single('file');

      await new Promise((resolve, reject) => {
        upload(req, res, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });

      if (!req.file) {
        return res.status(400).json('Файл не был передан');
      }

      // Путь, куда нужно переместить файл
      const { originalname, mimetype, buffer, size } = req.file;
      const newPath = path.join(__dirname, '..', 'files', `user${userID}`, originalname);

      // Проверяем существование файла
      try {
        await fs.access(newPath);
        // Файл существует, удаляем загруженный файл и возвращаем ошибку
        await fs.unlink(req.file.path);
        return res.status(400).json('Файл с таким именем уже существует');
      } catch (err) {
        // Файл не существует, продолжаем
      }

      // Перемещаем файл без чтения его содержимого
      await fs.rename(req.file.path, newPath, 'utf8');

      const newFile = await File.create({
        name: originalname, type: mimetype, path: newPath, size: size, storageID: req.user.storageID,
      });

      res.status(201).json('Файл успешно загружен');
    } catch (error) {
      console.error(error);
      return next(ApiError.badRequest('Ошибка добавления файла'));
    }
  }
}
module.exports = new StorageController();
