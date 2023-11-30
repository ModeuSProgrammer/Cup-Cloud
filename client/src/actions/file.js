import axios from "axios";

export function getFiles(dirID) {
  return async dispatch => {
    try {
      const response = await axios.get(`http://localhost:8000/api/CupCloud/storage/files${dirID ? '?parentID=' + dirID : ''}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      console.log(response.data);
    }
    catch (error) {
      alert(error.response.data.message);
    }
  }
}