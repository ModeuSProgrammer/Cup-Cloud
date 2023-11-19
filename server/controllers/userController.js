const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt'); // для хеширование паролей
const jwt = require('jsonwebtoken'); // для регистрации и тд
const { User, Profile, Storage } = require('../models/models');

const generateJwt = (ID, email, roleID, storageID) => {
  return jwt.sign(
    { ID, email, roleID, storageID },
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
        return next(ApiError.badRequest('Заполните все поля'));
      }

      // Проверка данных из двух инпутов
      if (password !== passwordTwo) {
        return next(ApiError.badRequest('Ошибка в поле пароль'));
      }

      // Проверка на наличие данной почты в бд
      const checkRegUser = await User.findOne({ where: { email } });
      if (checkRegUser) {
        return next(ApiError.badRequest('Пользователь с данной почтой уже зарегистрирован'));
      }

      //Создание нового пользователя с хешированием пароля
      const hashPassword = await bcrypt.hash(password, 5)
      const profile = await Profile.create({ avatar: 'avatarDefault.jpeg' });
      const storage = await Storage.create({ occupied: 0, status: true, datePay: new Date(), tariffID: 1 });
      const user = await User.create({ password: hashPassword, email, firstname, roleID: 1, storageID: storage.ID, profileID: profile.ID });
      const token = generateJwt(user.ID, user.email, user.roleID, storage.storageID);

      return res.json({ token });
    }
    catch (error) {
      console.error('Ошибка в регистрации:', error);
      return next(ApiError.internal('Внутренняя ошибка сервера'));
    }
  }



  async login(req, res, next) {
    const { email, password } = req.body;
    //проверяем наличие пользователя
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.internal('Пользователь не найден'));
    }

    let comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.internal('Неверный пароль'));
    }

    const token = generateJwt(user.ID, user.email, user.roleID, user.storageID);
    return res.json({ token });
  }



  // проверка и генерация нового токена для авторизации и продолжения сессии 
  async check(req, res, next) {
    const token = generateJwt(req.user.ID, req.user.email, req.user.roleID, req.user.storageID);
    return res.json({ token })
  }
}

module.exports = new UserController() 