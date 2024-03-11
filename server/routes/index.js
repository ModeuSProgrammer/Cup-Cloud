//главный собирательныый файл
const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const storageRouter = require('./storageRouter')
const tariffRouter = require('./tariffRouter')
const busyDRouter = require('./busyRouter')

//Для добавления, удалиния, изменений и т.д.

router.use('/', userRouter)
router.use('/storage', busyDRouter)
router.use('/storage', storageRouter)
router.use('/tariff', tariffRouter)

module.exports = router