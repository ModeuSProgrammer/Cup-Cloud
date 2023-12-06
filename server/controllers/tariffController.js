const ApiError = require('../error/ApiError');
const { Storage, File, Tariff } = require('../models/models');

class TariffController {

  //изменение тарифа
  async setTariff(req, res, next) {
    try {
      const ID = req.body.tariffID;
      console.log(ID)
      if (!ID) {
        return next(ApiError.badRequest('Отсутствует номер тарифа в запросе'));
      }
      const storageData = await Storage.findOne({ where: { ID: req.user.storageID } });
      storageData.tariffID = ID;
      await storageData.save();
      return res.json('Тариф выбран');
    } catch (error) {
      console.error(error);
      return next(ApiError.internal('Ошибка выбора тарифа'));
    }
  }
}
module.exports = new TariffController();
