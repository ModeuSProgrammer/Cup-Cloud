//главный собирательныый файл
const Router = require('express')
const router = new Router()
const BusyDController = require('../controllers/busyController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/procent', authMiddleware, BusyDController.diagramsProcent)
router.get('/occupied', authMiddleware, BusyDController.DiskOccupied)

module.exports = router