//главный собирательныый файл
const Router = require('express');
const router = new Router();

const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/check', authMiddleware, userController.check);

router.get('/getAvatar', authMiddleware, userController.getAvatar);
router.post('/avatar', authMiddleware, userController.uploadAvatar);
router.delete('/delete', authMiddleware, userController.deleteAvatar);

module.exports = router