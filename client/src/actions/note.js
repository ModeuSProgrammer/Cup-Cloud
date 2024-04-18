import axios from 'axios'
import { setTask } from '../reducers/busyDataReducer'

export async function CreateTaskNote(title, date, text) {
  try {
    const response = await axios.post(`http://localhost:8000/api/note/create`,
      { title, date, text },
      { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
    alert(response.data.message)
  } catch (error) {
    console.log(error)
    alert('Ошибка получения данных')
  }
}

export async function ShowTasks() {
  try {
    const response = await axios.get(`http://localhost:8000/api/note/tasks`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    if (response) {
      return (response.data)
    }
  }
  catch (error) {
    console.log(error)
    alert('Ошибка получения данных')
  }
}
export async function EndedTask(taskID) {
  try {
    const response = await axios.post(`http://localhost:8000/api/note/endedTask?taskID=${taskID}`, null,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
    alert(response.data.message)
  }
  catch (error) {
    console.log(error)
    alert('Ошибка получения данных')
  }
}

export async function DeleteTask(taskID) {
  try {
    const response = await axios.delete(`http://localhost:8000/api/note/deleteTask?taskID=${taskID}`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
    alert(response.data.message)
  }
  catch (error) {
    console.log(error)
    alert('Ошибка получения данных')
  }
}
export function OpenTask(taskID) {
  return async dispatch => {
    try {
      const response = await axios.post(`http://localhost:8000/api/note/openTask?taskID=${taskID}`, null,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
      dispatch(setTask(response.data))
    }
    catch (error) {
      console.log(error)
      alert('Ошибка получения данных')
    }
  }
}