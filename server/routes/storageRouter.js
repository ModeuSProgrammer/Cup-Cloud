//главный собирательныый файл
const Router = require('express');
const router = new Router();
const storageController = require('../controllers/storageController');
// для вызова чекроль checkRole('номерайди')

const authMiddleware = require('../middleware/authMiddleware');

router.post('/files', authMiddleware, storageController.createDir);
router.post('/upload', authMiddleware, storageController.uploadFile);
router.get('/files', authMiddleware, storageController.getFiles);


module.exports = router