import React from 'react'
import dirLogo from '../../../assets/folder1-icons.png'
import fileLogo from '../../../assets/file-icons.png'
import { useDispatch, useSelector } from "react-redux"
import { pushToStack, setCurrentDir } from "../../../reducers/fileReducer"
import { deleteFile, downloadFile } from '../../../actions/file'
import sizeFormat from './sizeFormat'
const File = ({ file }) => {
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.files.currentDir)

  function openDirHandler(file) {
    if (file.type === 'dir') {
      dispatch(pushToStack(currentDir))
      dispatch(setCurrentDir(file.ID))
    }
  }

  function downloadClickHanlder(e) {
    e.stopPropagation()
    downloadFile(file)
  }

  function deleteClickHandler(e) {
    e.stopPropagation()
    dispatch(deleteFile(file))
  }

  return (
    <div className='file' onClick={() => openDirHandler(file)}>
      <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img" />
      <div className="file__name">{file.name}</div>
      <div className="file__date">{file.date.slice(0, 10)}</div>
      <div className="file__size">{sizeFormat(file.size)}</div>
      {file.type !== 'dir' && <button onClick={(e) => downloadClickHanlder(e)} className="file__btn file__download">Скачать</button>}
      <button onClick={(e) => deleteClickHandler(e)} className="file__btn file__delete">Удалить</button>
    </div>
  )
}

export default File 