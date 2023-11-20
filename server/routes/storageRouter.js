//главный собирательныый файл
const Router = require('express');
const router = new Router();
const storageController = require('../controllers/storageController');
// для вызова чекроль checkRole('номерайди')

const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, storageController.createDir);


module.exports = router