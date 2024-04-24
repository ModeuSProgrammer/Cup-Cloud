import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'

import SectionBlock from "../components/section-block"
import ContainerBlock from "../components/container-block"
import ImgBlock from "../components/Img"
import { Link } from "react-router-dom"

import { logout } from "../reducers/userReducer"
import { getOccupied } from '../actions/file'
import { CreateTaskNote, DeleteTask, EndedTask, OpenTask, ShowTasks } from "../actions/note"

const Notes = () => {
  const dispatch = useDispatch()

  const placeCountGB = useSelector(state => state.busy.occupied.placeCountGB)
  const TDOccupied = useSelector(state => state.busy.occupied.TDOccupied)
  const roleID = useSelector(state => state.user.currentUser.roleID)

  useEffect(() => {
    dispatch(getOccupied(placeCountGB))
  }, [placeCountGB])

  const [CreateBtn, SetCreateBtn] = useState(true)
  const today = new Date().toISOString().substring(0, 10);
  const [dateTask, SetSelectedDate] = useState(today);
  const [title, SetTitle] = useState('')
  const [text, SetText] = useState('')

  function handlerClear() { SetTitle(''); SetText('') }

  const [tasks, setTasks] = useState([]);
  const [selectValue, SetSelectedValue] = useState("true");

  useEffect(() => {
    let flag = false
    async function fetchData() {
      const delay = 1000;
      setTimeout(async () => {
        const tasksData = await ShowTasks();
        if (tasksData !== undefined) {
          setTasks(tasksData);
        }
      }, (flag == true ? delay : 700))
      flag = true
    }
    if (selectValue && openTaskFlag == false) {
      fetchData();
    }
  }, [tasks, selectValue]);

  const [openTaskFlag, SetOpenTaskFlag] = useState(false)
  const [handlerTaskID, SetHandlerTaskID] = useState('')
  useEffect(() => {
    dispatch(OpenTask(handlerTaskID))
  }, [handlerTaskID])

  const titleTaskOpen = useSelector(state => state.busy.task.title)
  const textTaskOpen = useSelector(state => state.busy.task.text)

  return (
    <div className="page">
      <div className="body-bg-1">

        <header>
          <div className="header-width">
            <span />
            <Link to="/" >
              <div className="header-logo">
                <ImgBlock filePath="../img/logoCupCloud.svg" /><h4>CUP CLOUD</h4>
              </div>
            </Link>
            <div className='disk-occupiced'>
              <h2> <span>{placeCountGB % 1 ? placeCountGB.toFixed(1) : placeCountGB}Гб </span>из {TDOccupied}Гб</h2>
            </div>
            <div className="menu-base">
              <nav className="nav">
                <ul className="nav-list">
                  {roleID === 2 ? <li className="nav-item"> <Link to="/admin">АДМИН</Link></li> : ''}
                  <li className="nav-item"><Link to="/storage">ДИСК</Link></li>
                  <li className="nav-item"> <Link to="/notes">ЗАМЕТКИ</Link></li>
                  <li className="nav-item"> <Link to="/tariff">ТАРИФ</Link></li>
                  <li className="nav-item"> <Link to="/account">АККАУНТ</Link></li>
                  <li className="nav-item" > <Link to="/" onClick={() => dispatch(logout())}>ВЫХОД</Link></li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        {openTaskFlag ? (
          <SectionBlock sectionId="" className="">
            <ContainerBlock className="container container-create-note">
              <div className="note-open">
                <h3 className="note-open title">{titleTaskOpen}</h3>
                <h5 className="note-open text">{textTaskOpen}</h5>
                <form onSubmit={(e) => { e.preventDefault(); SetOpenTaskFlag(false) }}>
                  <input type="submit" value="Назад" />
                </form>
              </div>
            </ContainerBlock>
          </SectionBlock>
        ) : (
          CreateBtn ? (
            <SectionBlock sectionId="" className="">
              <ContainerBlock className="container container-note">
                <div className="note-title">
                  <h3>Заметки</h3>
                  <select className="note__options" value={selectValue} onChange={(event) => SetSelectedValue(event.target.value)} >
                    <option value={"true"}>Активные</option>
                    <option value={"false"}>Завершенные</option>
                  </select>

                  <input type="submit" onClick={() => SetCreateBtn(false)} value="Создать заметку" />
                </div>
                <div className="note-inner">
                  <ul className="note-list">
                    {selectValue === "true" ? (
                      tasks
                        .filter(task => task.status === true)
                        .map(task => (
                          <li className="note-list-item active" key={task.ID} >
                            <span className="title" onClick={() => { SetHandlerTaskID(task.ID); SetOpenTaskFlag(true) }}  >{task.title}</span>
                            <span> Создано: {task.date.split('T')[0]} <span onClick={() => EndedTask(task.ID)}>Завершить</span></span>
                          </li>
                        ))
                    ) : (
                      tasks
                        .filter(task => task.status === false)
                        .map(task => (
                          <li className="note-list-item ended" key={task.ID} >
                            <span className="title" onClick={() => { SetHandlerTaskID(task.ID); SetOpenTaskFlag(true) }}  >{task.title}</span>
                            <span>Создано: {task.date.split('T')[0]}  <span onClick={() => DeleteTask(task.ID)}>Удалить</span></span>
                          </li>
                        ))
                    )}
                  </ul>
                </div>
              </ContainerBlock>
            </SectionBlock>
          )
            :
            (
              <SectionBlock sectionId="" className="">
                <ContainerBlock className="container container-create-note">
                  <div className="create-note__box">
                    <div className="create-note__box-title">
                      <h3>Создать заметку</h3>
                      <form className="Close-btn" onSubmit={(e) => { e.preventDefault(); }}> <input type="submit" onClick={() => { SetCreateBtn(true); handlerClear(); SetSelectedValue("true") }} value="&#x2715;" /></form>
                    </div>
                    <form onSubmit={(e) => { e.preventDefault(); CreateTaskNote(title, dateTask, text); handlerClear(); }}>
                      <input type="text" value={title} placeholder="Название" onChange={(event) => SetTitle(event.target.value)} required />
                      <input type="date" value={dateTask} onChange={(event) => SetSelectedDate(event.target.value)} readOnly />
                      <textarea rows="5" placeholder="Содержание" minLength="1" maxLength="255" value={text} onChange={(event) => SetText(event.target.value)} required />
                      <input type="submit" value="Создать" />
                    </form>
                  </div>
                </ContainerBlock>
              </SectionBlock>
            )
        )}
      </div>
    </div >

  )
}

export default Notes