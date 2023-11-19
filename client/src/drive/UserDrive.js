import { makeAutoObservable } from 'mobx';

export default class UserDrive {
  constructor() {
    this._isAuth = false // не может изменяться назвние
    this._user = {}
    makeAutoObservable(this) // следит за вернхими компонентами
  }

  setIsAuth(bool) {
    this._isAuth = bool
  }
  setUser(user) {
    this._isAuth = user
  }
  // вызываются в случае если переменная была измененна
  get isAuth() {
    return this._isAuth
  }
  get user() {
    return this._user
  }
}

//СДУБЛИРОВАТЬ ДЛЯ Я ТАК ПОНИМАЮ ЕЩЁ ТАРИФА И ПРОФИЛЯ но это НЕ ТОЧНО НО СУТЬ ТОЖЕ ДРУГАЯ