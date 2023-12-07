import axios from "axios"
import { setFiles, addFile, deleteFileAction, setProcent } from "../reducers/fileReducer"
import { hideLoader, showLoader } from '../reducers/appReducer'

export function getFiles(dirID) {
  return async dispatch => {
    try {
      dispatch(showLoader())
      const response = await axios.get(`http://localhost:8000/api/storage/files${dirID ? '?parentID=' + dirID : ''}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      dispatch(setFiles(response.data))
    }
    catch (error) {
      alert(error)
    }
    finally {
      dispatch(getDiagrams())
      dispatch(hideLoader())
    }
  }
}
export function createDir(dirID, name) {
  return async dispatch => {
    try {
      const response = await axios.post(`http://localhost:8000/api/storage/files`, {
        name,
        parentID: dirID,
        type: 'dir'
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      dispatch(addFile(response.data))
    }
    catch (error) {
      alert(error)
    }
  }
}

export function uploadFile(file, dirID) {
  return async dispatch => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      if (dirID) {
        formData.append('parentID', dirID)
      }
      const response = await axios.post(`http://localhost:8000/api/storage/upload`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      dispatch(addFile(response.data))
      dispatch(getDiagrams())
    } catch (e) {
      alert(e.response.data.message)
    }
  }
}
export async function downloadFile(file) {
  const response = await fetch(`http://localhost:8000/api/storage/download?ID=${file.ID}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  if (response.status === 200) {
    const blob = await response.blob()
    const downloadUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = file.name
    document.body.appendChild(link)
    link.click()
    link.remove()
  }
}

export function deleteFile(file) {
  return async dispatch => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/storage/delete?ID=${file.ID}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(getDiagrams())
      dispatch(deleteFileAction(file.ID))
      alert(response.data)
    } catch (e) {
      alert(e.response.data.message)
    }
  }
}
export function searchFiles(search) {
  return async dispatch => {
    try {
      const response = await axios.get(`http://localhost:8000/api/storage/search?search=${search}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(setFiles(response.data))
    } catch (e) {
      alert(e.response.data.message)
    }
    finally {
      dispatch(hideLoader())
    }
  }
}

export function getDiagrams() {
  return async dispatch => {
    try {
      const response = await axios.get(`http://localhost:8000/api/storage/procent`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(setProcent(response.data))
    } catch (e) {
      alert(e.response.data.message)
    }
  }
}

