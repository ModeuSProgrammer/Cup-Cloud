import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"


import { logout } from "../reducers/userReducer"
import ImgBlock from '../components/Img'
import { setTariffUser, getTariffUser, FullTariffD } from '../actions/tariff'

import SectionBlock from "../components/section-block"
import ContainerBlock from "../components/container-block"
import TariffBlock from '../components/Tariffblock'
import { getOccupied } from '../actions/file'


const Tariff = () => {
  const dispatch = useDispatch()
  const currentStatus = useSelector(state => state.tariff.storageID)
  const [selectedTariff, setSelectedTariff] = useState(currentStatus)
  const tariffID = useSelector(state => state.tariff.tariffID)

  const placeCountGB = useSelector(state => state.busy.occupied.placeCountGB)
  const TDOccupied = useSelector(state => state.busy.occupied.TDOccupied)
  const roleID = useSelector(state => state.user.currentUser.roleID)

  const [TarrifBlockOne, setTarrifBlockOne] = useState(null);
  const [TarrifBlockTwo, setTarrifBlockTwo] = useState(null);
  const [TarrifBlockThree, setTarrifBlockThree] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const data1 = await FullTariffD(1);
      const data2 = await FullTariffD(2);
      const data3 = await FullTariffD(3);
      setTarrifBlockOne(data1);
      setTarrifBlockTwo(data2);
      setTarrifBlockThree(data3);
    }

    fetchData();
  }, []);

  useEffect(() => {
    dispatch(getTariffUser())
    dispatch(getOccupied(placeCountGB))
  }, [dispatch, placeCountGB, tariffID])


  function handleButtonClick(tariffID) {
    if (currentStatus !== tariffID) {
      dispatch(setTariffUser(tariffID))
    }
  }
  return (
    <div className="page">
      <div className='body-bg-1' >
        <header>
          <div className="header-width">
            <span />
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

        <SectionBlock sectionId="" className="section-Tariff">
          <ContainerBlock className="container container-Tariff">
            <h2>ТАРИФЫ</h2>
            <div className="Tariff-inner">

              {TarrifBlockOne !== null && (<TariffBlock name="Стандарт" status={tariffID === 1 ? 1 : 0} count={TarrifBlockOne.placeCount} price={TarrifBlockOne.price} selected={selectedTariff === 1}>
                <button className='btn__tariff' onClick={() => handleButtonClick(1)}>Получить</button>
              </TariffBlock>)}
              {TarrifBlockOne !== null && (<TariffBlock name="Профессиональный" status={tariffID === 2 ? 1 : 0} count={TarrifBlockTwo.placeCount} price={TarrifBlockTwo.price} selected={selectedTariff === 2}>
                <button className='btn__tariff' onClick={() => handleButtonClick(2)}>Получить</button>
              </TariffBlock>)}
              {TarrifBlockOne !== null && (<TariffBlock name="Бизнес" status={tariffID === 3 ? 1 : 0} count={TarrifBlockThree.placeCount} price={TarrifBlockThree.price} selected={selectedTariff === 3}>
                <button className='btn__tariff' onClick={() => handleButtonClick(3)}>Получить</button>
              </TariffBlock>)}
            </div>
          </ContainerBlock>
        </SectionBlock>
      </div >
    </div >
  )
}
export default Tariff
