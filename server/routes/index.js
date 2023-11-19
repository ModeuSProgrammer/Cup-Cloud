//главный собирательныый файл
const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const storageRouter = require('./storageRouter');

//Для добавления, удалиния, изменений и т.д.
router.use('/user', userRouter);
router.use('/storage', storageRouter);

module.exports = router