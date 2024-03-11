//главный собирательныый файл
const Router = require('express')
const router = new Router()
const storageController = require('../controllers/storageController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/files', authMiddleware, storageController.createDir)
router.post('/upload', authMiddleware, storageController.uploadFile)

router.get('/files', authMiddleware, storageController.getFiles)
router.get('/download', authMiddleware, storageController.downloadFile)
router.get('/search', authMiddleware, storageController.searchFile)

router.delete('/delete', authMiddleware, storageController.deleteFile)

module.exports = router