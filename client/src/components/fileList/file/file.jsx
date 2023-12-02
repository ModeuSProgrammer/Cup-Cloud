import React from 'react';
import dirLogo from '../../../assets/folder1-icons.png';
import fileLogo from '../../../assets/file-icons.png';
import { useDispatch, useSelector } from "react-redux";
import { pushToStack, setCurrentDir } from "../../../reducers/fileReducer";
const File = ({ file }) => {
  const dispatch = useDispatch();
  const currentDir = useSelector(state => state.files.currentDir);

  function openDirHandler() {
    dispatch(pushToStack(currentDir))
    dispatch(setCurrentDir(file.ID))
  }
  return (
    <div className='file' onClick={file.type === 'dir' ? () => openDirHandler() : ''}>
      <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img" />
      <div className="file__name">{file.name}</div>
      <div className="file__date">{file.date.slice(0, 10)}</div>
      <div className="file__size">{file.size}</div>
    </div>
  );
};

export default File;