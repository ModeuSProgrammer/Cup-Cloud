//главный собирательныый файл
const Router = require('express');
const router = new Router();
const tariffController = require('../controllers/tariffController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/tariff', authMiddleware, tariffController.setTariff);

module.exports = router