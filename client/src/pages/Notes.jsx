import React, { useEffect } from "react"
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

  useEffect(() => {
    dispatch(getOccupied(placeCountGB))
  }, [placeCountGB])

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
              <h2> <span>{placeCountGB % 1 ? placeCountGB.toFixed(1) : placeCountGB}Gb </span>из {TDOccupied}Gb</h2>
            </div>
            <div className="menu-base">
              <nav className="nav">
                <ul className="nav-list">
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


        <SectionBlock sectionId="" className="">
          <ContainerBlock className="container container-note">
            <div className="note-title">
              <h3>Заметки</h3>
              <input type="submit" value="Создать заметку" />
            </div>
            <hr className="note-hr-line" />
            <div className="note-inner">
            </div>

          </ContainerBlock>
        </SectionBlock>

      </div>
    </div>
  )
}

export default Notes