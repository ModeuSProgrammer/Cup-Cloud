import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'

import SectionBlock from "../components/section-block"
import ContainerBlock from "../components/container-block"
import ImgBlock from "../components/Img"
import { Link } from "react-router-dom"

import { logout } from "../reducers/userReducer"
import { getOccupied } from '../actions/file'

const Notes = () => {
  const dispatch = useDispatch()

  const placeCountGB = useSelector(state => state.busy.occupied.placeCountGB)
  const TDOccupied = useSelector(state => state.busy.occupied.TDOccupied)
  const roleID = useSelector(state => state.user.currentUser.roleID)

  useEffect(() => {
    dispatch(getOccupied(placeCountGB))
  }, [placeCountGB])

  const [CreateBtn, SetCreateBtn] = useState("false")

  return (
    <div className="page">
      <div className="body-bg-1">

        <header>
          <div className="header-width">
            <Link to="/">
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
                <input type="submit" onClick={() => SetCreateBtn(false)} value="Создать заметку" />
              </div>
              <div className="note-inner">
              </div>

            </ContainerBlock>
          </SectionBlock>

        )
          :
          (
            <SectionBlock sectionId="" className="">
              <ContainerBlock className="container container-create-note">
                <div className="">
                  <h3>Создать заметку</h3>
                  <input type="submit" onClick={() => SetCreateBtn(true)} value="Закрыть" />
                </div>
              </ContainerBlock>
            </SectionBlock>
          )}

      </div>
    </div>
  )
}

export default Notes