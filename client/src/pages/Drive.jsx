import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { logout } from "../reducers/userReducer"

import ContainerBlock from "../components/container-block"
import Pie from "../components/Pie-diagram"
import ImgBlock from '../components/Img'
import { getFiles, uploadFile, searchFiles, getDiagrams } from '../actions/file'

import FileList from '../components/fileList/fileList'
import Popup from '../components/Popup'
import { setCurrentDir, setPopupDisplay } from '../reducers/fileReducer'
import { showLoader } from '../reducers/appReducer'



const Drive = () => {
  const dispatch = useDispatch()
  const currentDir = useSelector(state => state.files.currentDir)
  const dirStack = useSelector(state => state.files.dirStack)
  const loader = useSelector(state => state.app.loader)
  const procent = useSelector(state => state.files.procent)
  const [searchName, setSearchName] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(false)
  const [dragEnter, setDragEnter] = useState(false)
  //для файлов
  useEffect(() => {
    dispatch(getFiles(currentDir))
  }, [currentDir])

  useEffect(() => {
    dispatch(getDiagrams(procent))
  }, [procent])

  // для создания папкок
  function showPopupHandler() {
    dispatch(setPopupDisplay('flex'))
  }
  //для возвращения назад
  function backClickHandler() {
    const backDirId = dirStack.pop()
    dispatch(setCurrentDir(backDirId))
  }
  // для загрузки несколько файлов
  function fileUploadHandler(event) {
    const files = [...event.target.files]
    files.forEach(file => dispatch(uploadFile(file, currentDir)))
  }
  // для загрузки несколько файлов через дроп вход в состояние
  function dragEnterHandler(event) {
    event.preventDefault()
    event.stopPropagation()
    setDragEnter(true)
  }
  // для загрузки несколько файлов через дроп выход из состояния
  function dragLeaveHandler(event) {
    event.preventDefault()
    event.stopPropagation()
    setDragEnter(false)
  }
  // для загрузки несколько файлов через дроп загрузка файлов из состояния
  function dropHandler(event) {
    event.preventDefault()
    event.stopPropagation()
    let files = [...event.dataTransfer.files]
    files.forEach(file => dispatch(uploadFile(file, currentDir)))
    console.log(files)
    setDragEnter(false)
  }
  // поиск файлов
  function searchChandeHandler(e) {
    setSearchName(e.target.value)
    if (searchTimeout !== false) {
      clearTimeout(searchTimeout)
    }
    dispatch(showLoader())
    if (e.target.value !== '') setSearchTimeout(setTimeout(() => {
      dispatch(searchFiles(e.target.value))
    }, 500))
    else {
      dispatch(getFiles(currentDir))
    }
  }
  return (!dragEnter ?
    <div className="page" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
      <div className="body-bg-1" >

        <header>
          <div className="header-width">
            <Link to="/">
              <div className="header-logo">
                <ImgBlock filePath="../img/logoCupCloud.svg" /><h4>CUP CLOUD</h4>
              </div>
            </Link>
            <div className="menu-base">
              <nav className="nav">
                <ul className="nav-list">
                  <li className="nav-item"><Link to="/storage">ДИСК</Link></li>
                  <li className="nav-item"> <Link to="/tariff">ТАРИФ</Link></li>
                  <li className="nav-item"> <Link to="/account">АККАУНТ</Link></li>
                  <li className="nav-item" > <Link to="/" onClick={() => dispatch(logout())}>ВЫХОД</Link></li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <Popup />
        <ContainerBlock className="container-drive">
          <div className="container-folderSearch">
            <form>
              <input type="search" placeholder="Поиск" className="FolderSearch" value={searchName} onChange={e => searchChandeHandler(e)} />
            </form>
            <div className="folders">
              <div className="drive_btns">
                <button className='drive_back' onClick={() => backClickHandler()} >Назад</button>
                <button className='drive_create' onClick={() => showPopupHandler()}>Создать папку</button>
                <div className='drive__upload'>
                  <label htmlFor='drive__upload-input' className='drive__upload-lable'>Загрузить файл</label>
                  <input type="file" className='drive__upload-input' id='drive__upload-input' multiple={true} onChange={(event) => fileUploadHandler(event)} />
                </div>
              </div>
            </div>
          </div>

          <div className="container-lastFile">
            <div className='listScroll'>
              {loader ? (
                <div className='loader'>
                  <div className="lds-default">
                    <div></div><div></div><div></div><div></div><div></div>
                    <div></div><div></div><div></div><div></div><div></div>
                    <div></div><div></div>
                  </div>
                </div>
              ) : (
                <FileList />
              )}
            </div>
          </div>

          <div className="container-diagrams">
            <div className="diagrams-info">
              <h3>Диск занят на</h3>
              <h2><span id="drive-procent" className="drive-procent">{procent} </span>%</h2></div>
            <Pie pieValue={procent} />
          </div>

        </ContainerBlock >
        <footer></footer>
      </div >
    </div >
    :
    <div className='drop-area' onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
      Перенесите файлы сюда
    </div>
  )
}
export default Drive 