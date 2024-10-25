//главный собирательныый файл
const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const noteController = require('../controllers/noteController')

router.post('/create', authMiddleware, noteController.CreateNote)
router.post('/endedTask', authMiddleware, noteController.EndedTask)
router.post('/openTask', authMiddleware, noteController.OpenTask)

router.delete('/deleteTask', authMiddleware, noteController.DeleteTask)

router.get('/tasks', authMiddleware, noteController.ShowsTasks)

module.exports = router