import React from 'react';
import { useSelector } from 'react-redux';
import File from "./file/file";

const FileList = () => {
  const files = useSelector(state => state.files.files).map(file => <File key={file.ID} file={file} />)
  // const files = [{ ID: 1, name: 'direc', type: 'dir', size: '5gb', date: '29.02.2020' },
  // { ID: 2, name: 'direc2', type: 'jpg', size: '5gb', date: '29.02.2020' },
  // ].map(file => <File key={file.ID} />)
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