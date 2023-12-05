import axios from "axios";
import { setFiles, addFile } from "../reducers/fileReducer";

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
      alert(error);
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
      alert(error);
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
        onUploadProgress: progressEvent => {
          const totalLength = progressEvent.event.lengthComputable ? progressEvent.event.total : progressEvent.event.target.getResponseHeader('content-length') || progressEvent.event.target.getResponseHeader('x-decompressed-content-length');
          console.log('total', totalLength)
          if (totalLength) {
            let progress = Math.round((progressEvent.loaded * 100) / totalLength)
            console.log(progress)
          }
        }
      });
      dispatch(addFile(response.data))
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