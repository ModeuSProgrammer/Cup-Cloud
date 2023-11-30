import axios from 'axios'
import { setUser } from "../reducers/userReducer";

export const registration = (email, password, passwordTwo, firstname) => {
  return async dispatch => {
    try {
      const response = await axios.post(`http://localhost:8000/api/CupCloud/`, {
        email,
        password,
        passwordTwo,
        firstname
      });
      alert('Пользователь создан');
      return response.data;
    } catch (error) {
      console.error(error);
      alert(error.response?.data.message || "Произошла ошибка при регистрации");
      throw error;
    }
  };
};


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
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get(`http://localhost:8000/api/CupCloud/auth`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(setUser(response.data.user));
      }
    } catch (e) {
      console.error(e);
      alert(e.response?.data.message || "Failed to authenticate.");
      localStorage.removeItem('token');
    }
  };
};
