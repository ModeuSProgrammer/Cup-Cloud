import axios from 'axios'
import { setUser } from "../reducers/userReducer";

export const registration = async (email, password, passwordTwo, firstname) => {
  try {
    const response = await axios.post(`http://localhost:8000/api/CupCloud/`, {
      email,
      password,
      passwordTwo,
      firstname
    })
    alert('Пользователь создан');
  }
  catch (error) {
    alert(error.response.data.message);
  }
}

export const login = (email, password) => {
  return async dispatch => {
    try {
      const response = await axios.post(`http://localhost:8000/api/CupCloud/login`, {
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
      const response = await axios.get(`http://localhost:8000/api/CupCloud/auth`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
      dispatch(setUser(response.data.user))
      localStorage.setItem('token', response.data.token)
    } catch (e) {
      alert(e.response.data.message)
      localStorage.removeItem('token')
    }
  }
}