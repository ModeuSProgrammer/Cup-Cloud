//главный собирательныый файл
const Router = require('express')
const router = new Router()
const tariffController = require('../controllers/tariffController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/setTariff', authMiddleware, tariffController.setTariff)
router.get('/getTariff', authMiddleware, tariffController.getTariff)


module.exports = router