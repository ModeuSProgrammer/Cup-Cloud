
const bcrypt = require('bcrypt')  // для хеширование паролей
const jwt = require('jsonwebtoken')  // для регистрации и тд
const { User, Profile, Storage, List } = require('../models/models')
const createDirMiddleware = require('../middleware/createDirMiddleware')
const path = require('path')
const fs = require('fs')
const uuid = require('uuid')

const generateJwt = (ID, email, roleID, storageID, dirMain, listID) => {
  return jwt.sign(
    { ID, email, roleID, storageID, dirMain, listID },
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
  ) // данные и ключ, опции
} // генерация токена

class UserController {
  async registration(req, res) {
    try {
      const { firstname, email, password, passwordTwo } = req.body
      // Проверка заполненых полей
      if (!email || !firstname || !password || !passwordTwo) {
        return res.status(400).json({ message: "Заполните все поля" })
      }
      // Проверка данных из двух инпутов
      if (password !== passwordTwo) {
        return res.status(200).json({ message: "Ошибка в поле пароль" })
      }
      // Проверка на наличие данной почты в бд
      const checkRegUser = await User.findOne({ where: { email: email } })
      if (checkRegUser) {
        return res.status(200).json({ message: "Пользователь с данной почтой уже зарегистрирован" })
      }
      //Создание нового пользователя с хешированием пароля
      const hashPassword = await bcrypt.hash(password, 5)
      const profile = await Profile.create()
      const storage = await Storage.create({ occupied: 0, status: true, datePay: new Date(), tariffID: 1 })
      const lists = await List.create({ storageID: storage.ID })

      const user = await User.create({ password: hashPassword, email, firstname, roleID: 1, storageID: storage.ID, profileID: profile.ID })

      // Передаем идентификатор хранилища в метод 
      await createDirMiddleware.createDirServices({ path: `user${storage.ID.toString()}` })
      const dirMain = `user${storage.ID.toString()}`
      const token = generateJwt(user.ID, user.email, user.roleID, user.storageID, dirMain, lists.ID)
      return res.json({ token, message: "Регистрация прошла успешно" })
    }
    catch (error) {
      return res.status(500).json({ message: "Внутренняя ошибка сервера" })
    }
  }

  async login(req, res) {
    const { email, password } = req.body
    try {
      const user = await User.findOne({ where: { email } })
      if (!user) {
        return res.status(200).json({ message: "Пользователь не найден" })
      }
      const isPasswordValid = bcrypt.compareSync(password, user.password)
      if (!isPasswordValid) {
        return res.status(200).json({ message: "Неверный пароль" })
      }
      const dirMain = `user${user.storageID.toString()}`
      const lists = await List.findOne({ where: { storageID: user.storageID } })
      const token = generateJwt(user.ID, user.email, user.roleID, user.storageID, dirMain, lists.ID)
      return res.json({
        token,
        user: {
          ID: user.ID,
          email: user.email,
          roleID: user.roleID,
          storageID: user.storageID,
          dirMain: dirMain
        },
      })
    } catch (error) {
      return res.status(500).json({ message: 'Ошибка Сервера' })
    }
  }

  // проверка и генерация нового токена для авторизации и продолжения сессии 
  async check(req, res, next) {
    const token = generateJwt(req.user.ID, req.user.email, req.user.roleID, req.user.storageID, req.user.dirMain, lists.ID)
    return res.json({ token })
  }

  //функции для профиля загрузка аватара
  async uploadAvatar(req, res, next) {
    try {
      const file = req.files.file
      const profile = await Profile.findOne({ where: { ID: req.user.ID } })
      const fileExtension = path.extname(file.name)
      const avatarName = uuid.v4() + fileExtension
      file.mv(process.env.staticPath + "\\" + avatarName)
      profile.avatar = avatarName
      await profile.save()
      return res.json(profile)
    }
    catch (error) {
      return res.json('Ошибка загрузки')
    }
  }
  //функции для профиля удаления аватара
  async deleteAvatar(req, res, next) {
    try {
      const profileData = await Profile.findOne({ where: { ID: req.user.ID } })
      if (process.env.staticPath + "\\" + profileData.avatar !== null) {
        fs.unlinkSync(process.env.staticPath + "\\" + profileData.avatar)
      }
      profileData.avatar = null
      await profileData.save()
      return res.json(profileData)
    }
    catch (error) {

      return res.json('Ошибка удаления')
    }
  }

  //отправка данных для отображения
  async getUserData(req, res, next) {
    try {
      const profileData = await Profile.findOne({ where: { ID: req.user.ID } })
      const userData = await User.findOne({ where: { ID: req.user.ID } })
      if (!profileData || !userData) {
        return res.status(404).json({ error: 'Данные не найдены' })
      }
      const { email, firstname } = userData
      const { avatar } = profileData
      return res.json({ email, firstname, avatar })
    }
    catch (error) {
      return res.json('Ошибка отображения данных')
    }
  }
  //добавление администратора
  async addAdminsApp(req, res) {
    try {
      const { email } = req.body.email
      const adminData = await User.findOne({ where: { email } })
      if (!adminData) {
        return res.status(200).json({ message: `Пользователь с почтой ${email} не найден` })
      }
      if (adminData.roleID === 2) {
        return res.status(200).json({ message: `Администратор с почтой ${email} уже существует` })
      }
      adminData.roleID = 2
      await adminData.save()
      const cheking = await User.findOne({ where: { email } })

      if (cheking.roleID === 2) {
        return res.status(200).json({ message: `Администратор с почтой ${email} добавлен` })
      } else {
        return res.status(200).json({ message: `Ошибка добавления администратора с почтой ${email}` })
      }
    }
    catch (error) {
      return res.json({ message: 'Ошибка сервера' })
    }
  }
}
module.exports = new UserController() 