import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../reducers/userReducer";

import NavMenu from "../components/NavMenu";
import ContainerBlock from "../components/container-block";
import Pie from "../components/Pie-diagram";
import Logo from "../components/Logo";
import { getFiles, uploadFile } from '../actions/file';

import FileList from '../components/fileList/fileList';
import Popup from '../components/Popup';
import { setCurrentDir, setPopupDisplay } from '../reducers/fileReducer';


const Drive = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector(state => state.files.currentDir);
  const dirStack = useSelector(state => state.files.dirStack);

  useEffect(() => {
    dispatch(getFiles(currentDir));
  }, [currentDir])

  function showPopupHandler() {
    dispatch(setPopupDisplay('flex'))
  }

  function backClickHandler() {
    const backDirId = dirStack.pop();
    dispatch(setCurrentDir(backDirId))
  }

  function fileUploadHandler(event) {
    const files = [...event.target.files]
    files.forEach(file => dispatch(uploadFile(file, currentDir)))
  }


  const MainLinks = [
    { url: '/storage', text: 'ДИСК', id: '1', internal: true },
    { url: '/Tariff', text: 'ТАРИФ', id: '2', internal: true },
    { url: '/account', text: 'АККАУНТ', id: '3', internal: true },
    { url: '/', text: 'ВЫХОД', id: '4', internal: false, onClick: () => dispatch(logout()) }
  ];
  return (
    <div className="body-bg-1" >
      <Logo />
      <NavMenu links={MainLinks} />
      <Popup />
      <ContainerBlock className="container-drive">
        <div className="container-folderSearch">
          <form>
            <input type="search" placeholder="Поиск" id="FolderSearch" />
            <input type="submit" value=">" />
          </form>
          <div className="folders">
            <div className="drive_btns">
              <button className='drive_back' onClick={() => backClickHandler()} >Назад</button>
              <button className='drive_create' onClick={() => showPopupHandler()}>Создать папку</button>
            </div>
          </div>

          <div className='drive__upload'>
            <label htmlFor='drive__upload-input' className='drive__upload-lable'>Загрузить файл</label>
            <input type="file" className='drive__upload-input' id='drive__upload-input' multiple={true} onChange={(event) => fileUploadHandler(event)} />
          </div>
        </div>

        <div className="container-lastFile">
          <div className='listScroll'>
            <FileList />
          </div>
        </div>
        <div className="container-diagrams">
          <div className="diagrams-info">
            <h3>Диск занят на</h3>
            <h2><span id="drive-procent" className="drive-procent">90</span>%</h2></div>
          <Pie pieValue="90" />
        </div>
      </ContainerBlock>
    </div>
  );
}
export default Drive;