import SectionBlock from "../components/section-block"
import ContainerBlock from "../components/container-block"
import ImgBlock from "../components/Img"
import { Link } from "react-router-dom"

const Main = () => {
  return (
    <div className="page">
      <div className="body-bg-0">
        <div className="menu-start">
          <nav className="nav">
            <ul className="nav-list">
              <li className="nav-item"><Link to="/">ГЛАВНАЯ</Link></li>
              <li className="nav-item"> <Link to="/registration">АВТОРИЗАЦИЯ | РЕГИСТРАЦИЯ</Link></li>
            </ul>
          </nav>
        </div>

        <SectionBlock sectionId="main" className="container-header" />

        <SectionBlock sectionId="aboutus" className="">
          <ContainerBlock className="container">
            <div>
              <h2>О НАС</h2>
              <h4><b>Cup Cloud</b> - это стартап-проект, ориентированный на аудиторию разных возрастов.<br />
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
              <h4>Для всех пользователей у нас найдётся выгодный тариф<br />  от базового до бизнеса, что позволит вам использовать<br />
                хранилище на полную.<br />При необходимости вы также можете свободно<br />менять подписку на другую, которая лучше всего<br />удовлетворяет ваши потребности и предпочтения.</h4>
            </div>
            <div className="saleimage">
              <ImgBlock filePath="../img/iconsgraphic.png" className="" />
            </div>
          </ContainerBlock>
        </SectionBlock>
        <footer></footer>
      </div >
    </div >
  )
}
export default Main 