import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Disk = () => {
  const dispatch = useDispatch();
  const currentDir = useSelector(state => state.files.currentDir);
  useEffect(() => {
    dispatch(getFiles(currentDir))
  }, [currentDir])

  return (
    <div>
      disk
    </div>
  );
};

export default Disk;