import axios from 'axios'


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
    alert('Ошибка получения даных')
  }
}