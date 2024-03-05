import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { logout } from "../reducers/userReducer"
import ImgBlock from '../components/Img'
import { setTariffUser, getTariffUser } from '../actions/tariff'

import SectionBlock from "../components/section-block"
import ContainerBlock from "../components/container-block"
import TariffBlock from "../components/Tariffblock"

const Tariff = () => {
  const dispatch = useDispatch()
  const currentStatus = useSelector(state => state.tariff.storageID)
  const [selectedTariff, setSelectedTariff] = useState(currentStatus)
  const tariffID = useSelector(state => state.tariff.tariffID)

  useEffect(() => {
    dispatch(getTariffUser())
  }, [dispatch])

  function handleButtonClick(tariffID, event) {
    if (currentStatus !== tariffID) {
      dispatch(setTariffUser(tariffID))
    }
  }

  return (
    <div className="page">
      <div className='body-bg-1' >
        <header>
          <div className="header-width">
            <Link to="/">
              <div className="header-logo">
                <ImgBlock filePath="../img/logoCupCloud.svg" /><h4>CUP CLOUD</h4>
              </div>
            </Link>
            <div className="menu-base">
              <nav className="nav">
                <ul className="nav-list">
                  <li className="nav-item"><Link to="/storage">ДИСК</Link></li>
                  <li className="nav-item"> <Link to="/tariff">ТАРИФ</Link></li>
                  <li className="nav-item"> <Link to="/account">АККАУНТ</Link></li>
                  <li className="nav-item" > <Link to="/" onClick={() => dispatch(logout())}>ВЫХОД</Link></li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <SectionBlock sectionId="" className="section-Tariff">
          <ContainerBlock className="container container-Tariff">
            <h2>ТАРИФЫ</h2>
            <div className="Tariff-inner">
              <TariffBlock name="Стандарт" status={tariffID === 1 ? 1 : 0} count={15} price={0} selected={selectedTariff === 1}>
                <button className='btn__tariff' onClick={(event) => handleButtonClick(1, event)}>Получить</button>
              </TariffBlock>
              <TariffBlock name="Профессиональный" status={tariffID === 2 ? 1 : 0} count={100} price={200} selected={selectedTariff === 2}>
                <button className='btn__tariff' onClick={(event) => handleButtonClick(2, event)}>Получить</button>
              </TariffBlock>
              <TariffBlock name="Бизнес" status={tariffID === 3 ? 1 : 0} count={500} price={400} selected={selectedTariff === 3}>
                <button className='btn__tariff' onClick={(event) => handleButtonClick(3, event)}>Получить</button>
              </TariffBlock>
            </div>
          </ContainerBlock>
        </SectionBlock>
      </div >
    </div >
  )
}
export default Tariff
