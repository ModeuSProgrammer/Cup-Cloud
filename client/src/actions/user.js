import axios from 'axios'
import { setProfile, setUser } from "../reducers/userReducer"

export const registration = async (email, password, passwordTwo, firstname) => {
  try {
    const response = await axios.post(`http://localhost:8000/api/registration`, {
      email,
      password,
      passwordTwo,
      firstname
    })
    let message = response.data.message ? response.data.message : 'Ошибка'
    alert(message)
  } catch (error) {
    console.error('Registration failed:', error)
    alert(error.response?.data.message || "Произошла ошибка при регистрации")
  }
}


export const login = (email, password) => {
  return async dispatch => {
    try {
      const response = await axios.post(`http://localhost:8000/api/login`, {
        email,
        password
      })
      dispatch(setUser(response.data.user))
      localStorage.setItem('token', response.data.token)
    } catch (e) {
      alert(e.response.data.message)
    }
  }
}

export const auth = () => {
  return async dispatch => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        const response = await axios.get(`http://localhost:8000/api/check`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        dispatch(setUser(response.data.user))
      }
    } catch (e) {
      console.error(e)
      alert(e.response?.data.message || "Ошибка проверки авторизации.")
      localStorage.removeItem('token')
    }
  }
}

export const uploadAvatar = (file) => {
  return async dispatch => {
    try {
      const token = localStorage.getItem('token')
      const formData = new FormData()
      formData.append('file', file)
      const response = await axios.post(`http://localhost:8000/api/avatar`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      })

      dispatch(setProfile(response.data))
    } catch (e) {
      console.log(e)
      console.error(e)
    }
  }
}
export const deleteAvatar = (file) => {
  return async dispatch => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.delete(`http://localhost:8000/api/delete`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      dispatch(setProfile(response.data))
    } catch (e) {
      console.error(e)
    }
  }
}

export const showData = () => {
  return async dispatch => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(`http://localhost:8000/api/getdata`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      const { email, firstname, avatar } = response.data
      dispatch(setProfile(response.data))
    } catch (e) {
      console.log(e)
      console.error(e)
    }
  }
} 