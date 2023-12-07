import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from "../reducers/userReducer"

import { setTariffUser, getTariffUser } from '../actions/tariff'

import NavMenu from "../components/NavMenu"
import Footer from "../components/Footer"
import SectionBlock from "../components/section-block"
import ContainerBlock from "../components/container-block"
import Logo from "../components/Logo"
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

  const MainLinks = [
    { url: '/storage', text: 'ДИСК', id: '1', internal: true },
    { url: '/tariff', text: 'ТАРИФ', id: '2', internal: true },
    { url: '/account', text: 'АККАУНТ', id: '3', internal: true },
    { url: '/', text: 'ВЫХОД', id: '4', internal: false, onClick: () => dispatch(logout()) }
  ]
  return (
    <div className='body-bg-1' >
      <Logo />
      <NavMenu links={MainLinks} />
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
      <Footer />
    </div >
  )
}
export default Tariff
