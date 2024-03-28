import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'

import SectionBlock from "../components/section-block"
import ContainerBlock from "../components/container-block"
import ImgBlock from "../components/Img"
import { Link } from "react-router-dom"

import { logout } from "../reducers/userReducer"
import { getOccupied } from '../actions/file'

const Admin = () => {
  const dispatch = useDispatch()

  const placeCountGB = useSelector(state => state.busy.occupied.placeCountGB)
  const TDOccupied = useSelector(state => state.busy.occupied.TDOccupied)
  const roleID = useSelector(state => state.user.currentUser.roleID)

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
              <h2> <span>{placeCountGB % 1 ? placeCountGB.toFixed(1) : placeCountGB}Гб </span>из {TDOccupied}Гб</h2>
            </div>
            <div className="menu-base">
              <nav className="nav">
                <ul className="nav-list">
                  {roleID === 2 ? (<li className="nav-item"> <Link to="/admin">АДМИН</Link></li>) : ''}
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


        <SectionBlock sectionId="" className="section-admin">
          <ContainerBlock className="container-admin">
            <div className="container-admin__tariff">
              <h4>Измение тарифов</h4>
              <div className="blocks-tariff">
                <div className="block-tariff">
                  <h4>Базовый</h4>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <input type="number" placeholder="Количество ГБ" />
                    <input type="number" placeholder="Количество заметок" />
                    <input type="number" placeholder="Цена" />
                    <input type="submit" value="Изменить" />
                  </form>
                </div>
                <div className="block-tariff">
                  <h4>Профессиональный</h4>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <input type="number" placeholder="Количество ГБ" />
                    <input type="number" placeholder="Количество заметок" />
                    <input type="number" placeholder="Цена" />
                    <input type="submit" value="Изменить" />
                  </form>
                </div>
                <div className="block-tariff">
                  <h4>Бизнес</h4>
                  <form onSubmit={(e) => e.preventDefault()}>
                    <input type="number" placeholder="Количество ГБ" />
                    <input type="number" placeholder="Количество заметок" />
                    <input type="number" placeholder="Цена" />
                    <input type="submit" value="Изменить" />
                  </form>
                </div>
              </div>
            </div>
          </ContainerBlock>
        </SectionBlock>

      </div>
    </div>
  )
}

export default Admin