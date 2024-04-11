import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'

import SectionBlock from "../components/section-block"
import ContainerBlock from "../components/container-block"
import ImgBlock from "../components/Img"
import { Link } from "react-router-dom"

import { logout } from "../reducers/userReducer"
import { getOccupied } from '../actions/file'
import { CreateTaskNote, ShowTasks } from "../actions/note"

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
    async function fetchData() {
      const tasksData = await ShowTasks();
      if (tasksData !== undefined) {
        setTasks(tasksData);
      }
    }
    if (selectValue) {
      fetchData();
    }
  }, [tasks, selectValue]);

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

        {CreateBtn ? (
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
                        <li className="note-list-item active" key={task.id}>
                          <span className="title">{task.title}</span>
                          <span> Создано: {task.date.split('T')[0]} <span>Завершить</span></span>

                        </li>
                      ))
                  ) : (
                    tasks
                      .filter(task => task.status === false)
                      .map(task => (
                        <li className="note-list-item ended" key={task.id}>
                          <span className="title">{task.title}</span>
                          <span>Создано: {task.date.split('T')[0]}</span>
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
                    <textarea rows="5" placeholder="Содержание" minLength="1" maxlength="500" value={text} onChange={(event) => SetText(event.target.value)} required />
                    <input type="submit" value="Создать" />
                  </form>
                </div>
              </ContainerBlock>
            </SectionBlock>
          )}
      </div>
    </div >

  )
}

export default Notes