import React, { } from 'react'
import { useDispatch } from 'react-redux'
import { logout } from "../reducers/userReducer"

import { setTariff } from '../actions/file'

import NavMenu from "../components/NavMenu";
import Footer from "../components/Footer";
import SectionBlock from "../components/section-block";
import ContainerBlock from "../components/container-block";
import Logo from "../components/Logo";
import TariffBlock from "../components/Tariffblock";

const Tariff = () => {
  const dispatch = useDispatch()
  const handleButtonClick = (ID, event) => {
    setTariff(ID);
  };

  const MainLinks = [
    { url: '/storage', text: 'ДИСК', id: '1', internal: true },
    { url: '/tariff', text: 'ТАРИФ', id: '2', internal: true },
    { url: '/account', text: 'АККАУНТ', id: '3', internal: true },
    { url: '/', text: 'ВЫХОД', id: '4', internal: false, onClick: () => dispatch(logout()) }
  ];
  return (
    <div className='body-bg-1' >
      <Logo />
      <NavMenu links={MainLinks} />
      <SectionBlock sectionId="" className="section-Tariff">
        <ContainerBlock className="container container-Tariff">
          <h2>ТАРИФЫ</h2>
          <div className="Tariff-inner">
            <TariffBlock name="Стандарт" status={1} count={15} price={0} >
              <button id="BaseTarrif" onClick={(event) => handleButtonClick('1', event)}>Получить</button>
            </TariffBlock>
            <TariffBlock name="Профессиональный" status={0} count={100} price={200} >
              <button id="ProTarrif" onClick={(event) => handleButtonClick('2',)}>Получить</button>
            </TariffBlock>
            <TariffBlock name="Бизнес" status={0} count={500} price={400}>
              <button id="BusTarrif" onClick={(event) => handleButtonClick('3')}>Получить</button>
            </TariffBlock>
          </div>
        </ContainerBlock>
      </SectionBlock>
      <Footer />
    </div >
  );
}


export default Tariff;
