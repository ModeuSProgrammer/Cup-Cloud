import React from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setPopupDisplay } from "../reducers/fileReducer"
import { createDir } from '../actions/file'

const Popup = () => {
  const [dirName, setDirName] = useState('')
  const popupDisplay = useSelector(state => state.files.popupDisplay)
  const currentDir = useSelector(state => state.files.currentDir)
  const dispatch = useDispatch()

  function createHandler() {
    dispatch(createDir(currentDir, dirName)).then(() => {
      setDirName('')
      dispatch(setPopupDisplay('none'))
    })
  }
  return (
    <div className="popup" onClick={() => dispatch(setPopupDisplay('none'))} style={{ display: popupDisplay }}>
      <div className="popop__content" onClick={(event) => event.stopPropagation()}>
        <div className="popup__header">
          <div className="popup__title">Создать новую папку</div>
          <button className="popup__close" onClick={() => dispatch(setPopupDisplay('none'))}>X</button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); createHandler() }}>
          <input type="text" min="1" placeholder="Введите название папки" value={dirName} onChange={(e) => setDirName(e.target.value)} />
        </form>
        <button className="popup__create" onClick={() => createHandler()}>Создать</button>
      </div>
    </div>
  )
}
export default Popup 