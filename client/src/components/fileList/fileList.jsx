import React from 'react'
import { useSelector } from 'react-redux'
import File from "./file/file"
import { TransitionGroup, CSSTransition } from 'react-transition-group'

const FileList = () => {
  const files = useSelector(state => state.files.files)

  if (files.length === 0) {
    return <div className='NotFiles'>Файлы не найдены</div>
  }
  return (
    <div className='fileList'>
      <div className='filelist__header'>
        <div className='filelist__name'>Название</div>
        <div className='filelist__date'>Дата</div>
        <div className='filelist__size'>Размер</div>
      </div>
      <TransitionGroup>
        {files.map(file =>
          <CSSTransition key={file.ID}
            timeout={500}
            classNames={'file'}
            exit={false}
          >
            <File file={file} />
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  )
}

export default FileList 