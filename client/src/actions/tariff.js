import axios from "axios"
import { setTariff, getTariff, getDT } from "../reducers/tariffReducer"


export function setTariffUser(tariffID) {
  return async dispatch => {
    try {
      const response = await axios.post(`http://localhost:8000/api/tariff/setTariff`, { tariffID }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      const tariff = response.data
      dispatch(setTariff(tariff))
      alert(response.data.message)
    } catch (error) {
      console.log(error)
      alert(error.response.data.message)
    }
  }
}

export function getTariffUser() {
  return async dispatch => {
    try {
      const response = await axios.get(`http://localhost:8000/api/tariff/getTariff`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(getTariff({ tariffID: response.data.tariffID }))
    } catch (error) {
      console.log(error)
      alert('Ошибка отображения тарифа')
    }
  }
}

export async function FullTariffD(numList) {
  try {
    const response = await axios.post(`http://localhost:8000/api/tariff/fullDataTariff`, { numList }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    return (response.data)
  } catch (error) {
    console.log(error)
    alert('Ошибка на сервере')
  }
}
export function DataUserT() {
  return async dispatch => {
    try {
      const response = await axios.get(`http://localhost:8000/api/tariff/dataUserTariff`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(getDT(response.data))
    } catch (error) {
      console.log(error)
      alert('Ошибка получения данынх')
    }
  }
}