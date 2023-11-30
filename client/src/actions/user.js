import axios from 'axios'
import { setUser } from "../reducers/userReducer";

export const registration = async (email, password, passwordTwo, firstname) => {
  try {
    const response = await axios.post(`http://localhost:8000/api/registration`, {
      email,
      password,
      passwordTwo,
      firstname
    })
    alert('Пользователь создан');
  } catch (error) {
    console.error('Registration failed:', error);
    alert(error.response?.data.message || "Произошла ошибка при регистрации");
  };
};


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
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get(`http://localhost:8000/api/check`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(setUser(response.data.user));
      }
    } catch (e) {
      console.error(e);
      alert(e.response?.data.message || "Ошибка проверки авторизации.");
      localStorage.removeItem('token');
    }
  };
};
