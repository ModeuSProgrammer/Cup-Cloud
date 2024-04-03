import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'

import SectionBlock from "../components/section-block"
import ContainerBlock from "../components/container-block"
import ImgBlock from "../components/Img"
import { Link } from "react-router-dom"

import { logout } from "../reducers/userReducer"
import { getOccupied } from '../actions/file'
import { ChangeCellTariff } from "../actions/tariff"

const Admin = () => {
  const dispatch = useDispatch()

  const placeCountGB = useSelector(state => state.busy.occupied.placeCountGB)
  const TDOccupied = useSelector(state => state.busy.occupied.TDOccupied)
  const roleID = useSelector(state => state.user.currentUser.roleID)

  useEffect(() => {
    dispatch(getOccupied(placeCountGB))
  }, [placeCountGB])
  //СТАНДАРТ
  const [GBS, setGbS] = useState('')
  const [taskS, setTaskS] = useState('')
  const [priceS, setPriceS] = useState('')
  function handlerClearS() {
    setGbS("");
    setTaskS("");
    setPriceS("");
  }
  //ПРОФЕССИОНАЛЬНЫЙ
  const [GBP, setGbP] = useState('')
  const [taskP, setTaskP] = useState('')
  const [priceP, setPriceP] = useState('')
  function handlerClearP() {
    setGbP("");
    setTaskP("");
    setPriceP("");
  }
  //БИЗНЕС
  const [GBB, setGbB] = useState('')
  const [taskB, setTaskB] = useState('')
  const [priceB, setPriceB] = useState('')

  function handlerClearB() {
    setGbB("");
    setTaskB("");
    setPriceB("");
  }

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
                  <form onSubmit={(e) => { e.preventDefault(); ChangeCellTariff(1, GBS, taskS, priceS); handlerClearS() }}>
                    <input type="number" value={GBS} onChange={(event) => setGbS(event.target.value)} placeholder="Количество ГБ" />
                    <input type="number" value={taskS} onChange={(event) => setTaskS(event.target.value)} placeholder="Количество заметок" />
                    <input type="number" value={priceS} onChange={(event) => setPriceS(event.target.value)} placeholder="Цена" />
                    <input type="submit" value="Изменить" />
                  </form>
                </div>
                <div className="block-tariff">
                  <h4>Профессиональный</h4>
                  <form onSubmit={(e) => { e.preventDefault(); ChangeCellTariff(2, GBP, taskP, priceP); handlerClearP() }}>
                    <input type="number" value={GBP} onChange={(event) => setGbP(event.target.value)} placeholder="Количество ГБ" />
                    <input type="number" value={taskP} onChange={(event) => setTaskP(event.target.value)} placeholder="Количество заметок" />
                    <input type="number" value={priceP} onChange={(event) => setPriceP(event.target.value)} placeholder="Цена" />
                    <input type="submit" value="Изменить" />
                  </form>
                </div>
                <div className="block-tariff">
                  <h4>Бизнес</h4>
                  <form onSubmit={(e) => { e.preventDefault(); ChangeCellTariff(3, GBB, taskB, priceB); handlerClearB() }}>
                    <input type="number" value={GBB} onChange={(event) => setGbB(event.target.value)} placeholder="Количество ГБ" />
                    <input type="number" value={taskB} onChange={(event) => setTaskB(event.target.value)} placeholder="Количество заметок" />
                    <input type="number" value={priceB} onChange={(event) => setPriceB(event.target.value)} placeholder="Цена" />
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