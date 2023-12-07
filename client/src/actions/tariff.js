import axios from "axios"
import { setTariff, getTariff } from "../reducers/tariffReducer"


export function setTariffUser(tariffID) {
  return async dispatch => {
    try {
      const response = await axios.post(`http://localhost:8000/api/tariff/setTariff`, { tariffID }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(setTariff({ tariffID }))
      alert('Тариф был выбран успешно')
    } catch (error) {
      console.log(error)
      alert('Ошибка выбора тарифа')
    }
  }
}
export function getTariffUser(tariffID) {
  return async dispatch => {
    try {
      const response = await axios.get(`http://localhost:8000/api/tariff/getTariff`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(getTariff({ tariffID: response.data }))
    } catch (error) {
      console.log(error)
      alert('Ошибка отображения тарифа')
    }
  }
}