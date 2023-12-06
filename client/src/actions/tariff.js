import axios from 'axios'
import { setTariff } from "../reducers/tariffReducer";

export function SetTariff(ID) {
  return async dispatch => {
    try {
      const response = await axios.post(`http://localhost:8000/api/tariff?ID=${ID}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      dispatch(setTariff())
      alert(response.data);
    } catch (error) {
      console.error('Registration failed:', error);
      alert(error.response?.data.message || "Произошла ошибка при регистрации");
    };
  };
};

