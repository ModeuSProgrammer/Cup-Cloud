import React, { useState } from "react"

import NavMenu from "../components/NavMenu"
import Footer from "../components/Footer"
import SectionBlock from "../components/section-block"
import ContainerBlock from "../components/container-block"
import ImgBlock from "../components/Img"
import { registration } from "../actions/user"

const Main = () => {
  const MainLinks = [
    { url: '/', text: 'ГЛАВНАЯ', id: '1', internal: true },
    { url: '/#aboutus', text: 'О НАС', id: '2', internal: false },
    { url: '/#Sale', text: 'АКЦИЯ', id: '3', internal: false },
    { url: '/registration', text: 'РЕГИСТРАЦИЯ', id: '4', internal: true },
    { url: '/login', text: 'ВХОД', id: '5', internal: false }
  ]
  return (
    <div className="body-bg-0">
      <NavMenu links={MainLinks} />
      <SectionBlock sectionId="main" className="container-header">
        <div className="header-bg-image">
          <div className="header-inner">
            <h1>CUP<br />CLOUD</h1>
            <div className="main-header-logo">
              <ImgBlock filePath="../img/logoCupCloud2.svg" className="logo" />
            </div>
          </div>
        </div>
        <hr className="head-hr-line" />
      </SectionBlock>

      <SectionBlock sectionId="aboutus" className="">
        <ContainerBlock className="container">
          <div>
            <h2>О НАС</h2>
            <h4><b>Cup Cloud</b> - это стартап-проект, ориентированный на аудиториюразных возрастов.<br />
              Наш сервер предоставляет услугу для безопасного хранения ваших файлов.<br />
              Вместе с привлекательным дизайном, мы предоставляем удобные<br />
              функциональные возможности, которых не найти в других хранилищах.<br />
              Здесь вы можете легко управлять вашими файлами и подобрать тариф, который полностью соответствует вашим потребностям.</h4>
          </div>
        </ContainerBlock>
      </SectionBlock>

      <SectionBlock sectionId="Sale" className="">
        <ContainerBlock className="container">
          <div className="sale-inner">
            <h2>ТАРИФЫ</h2>
            <div className="sale-info">
              <h4>Для всех пользователей у нас найдётся выгодный<br />тариф от базового до бизнеса, что позволит вам использовать
                хранилище на полную.<br />При необходимости вы также можете свободно<br /> менять подписку на другую, которая лучше всего<br />удовлетворяет ваши потребности и предпочтения.</h4>
            </div>
          </div>
          <div className="saleimage">
            <ImgBlock filePath="../img/sale.png" className="" />
          </div>
        </ContainerBlock>
      </SectionBlock>
      <Footer />
    </div >
  )
}
export default Main 