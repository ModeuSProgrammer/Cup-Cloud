import axios from "axios";
import { setFiles } from "../reducers/fileReducer";

export function getFiles(dirID) {
  return async dispatch => {
    try {
      const response = await axios.get(`http://localhost:8000/api/storage/files${dirID ? '?parentID=' + dirID : ''}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      dispatch(setFiles(response.data))
      console.log(response.data);
    }
    catch (error) {
      alert(error.response.data.message);
    }
  }
}