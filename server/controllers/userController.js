const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt'); // для хеширование паролей
const jwt = require('jsonwebtoken'); // для регистрации и тд
const path = require('path');
const { User, Profile, Storage } = require('../models/models');
const createDirMiddleware = require('../middleware/createDirMiddleware');

const generateJwt = (ID, email, roleID, storageID, dirMain) => {
  return jwt.sign(
    { ID, email, roleID, storageID, dirMain },
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
  ) // данные и ключ, опции
} // генерация токена


//функции и их вызов с обработкой от get post и тд
class UserController {
  async registration(req, res, next) {
    try {
      const { firstname, email, password, passwordTwo } = req.body;
      // Проверка заполненых полей
      if (!email || !firstname || !password || !passwordTwo) {
        return res.status(400).json({ message: "Заполните все поля" });
      }

      // Проверка данных из двух инпутов
      if (password !== passwordTwo) {
        return res.status(400).json({ message: "Ошибка в поле пароль" });
      }

      // Проверка на наличие данной почты в бд
      const checkRegUser = await User.findOne({ where: { email } });
      if (checkRegUser) {
        return res.status(400).json({ message: "Пользователь с данной почтой уже зарегистрирован" });
      }

      //Создание нового пользователя с хешированием пароля
      const hashPassword = await bcrypt.hash(password, 5)
      const profile = await Profile.create({ avatar: 'avatarDefault.jpeg' });
      const storage = await Storage.create({ occupied: 0, status: true, datePay: new Date(), tariffID: 1 });
      const user = await User.create({ password: hashPassword, email, firstname, roleID: 1, storageID: storage.ID, profileID: profile.ID });

      // Передаем идентификатор хранилища в метод 
      await createDirMiddleware.createDirServices({ path: `user${storage.ID.toString()}` });
      const dirMain = `user${storage.ID.toString()}`;
      console.log(dirMain);
      const token = generateJwt(user.ID, user.email, user.roleID, user.storageID, dirMain);
      return res.json({ token });
    }
    catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Внутренняя ошибка сервера" });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" });
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Неверный пароль" });
      }
      const dirMain = `user${user.storageID.toString()}`;
      const token = generateJwt(user.ID, user.email, user.roleID, user.storageID, dirMain);
      return res.json({
        token,
        user: {
          ID: user.ID,
          email: user.email,
          roleID: user.roleID,
          storageID: user.storageID,
        },
      });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  };




  // проверка и генерация нового токена для авторизации и продолжения сессии 
  async check(req, res, next) {
    const token = generateJwt(req.user.ID, req.user.email, req.user.roleID, req.user.storageID, req.user.dirMain);
    return res.json({ token })
  }
}

module.exports = new UserController() 