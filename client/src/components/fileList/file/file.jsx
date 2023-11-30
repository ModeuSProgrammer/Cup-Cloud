import React from 'react';
import dirLogo from '../../../assets/folder1-icons.png'
import fileLogo from '../../../assets/file-icons.png'
const File = ({ file }) => {
  return (
    <div className='file'>
      <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img" />
      <div className="file__name">{file.name}</div>
      <div className="file__date">{file.date.slice(0, 10)}</div>
      <div className="file__size">{file.size}</div>
    </div>
  );
};

export default File;