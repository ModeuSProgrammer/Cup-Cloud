import React from 'react';
import { useSelector } from 'react-redux';
import File from "./file/file";

const FileList = () => {
  const files = useSelector(state => state.files.files).map(file => <File key={file.ID} file={file} />)
  return (
    <div className='fileList'>
      <div className='filelist__header'>
        <div className='filelist__name'>Название</div>
        <div className='filelist__date'>Дата</div>
        <div className='filelist__size'>Размер</div>
      </div>
      {files}
    </div>
  );
};

export default FileList;