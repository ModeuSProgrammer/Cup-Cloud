import React from "react";

import NavMenu from "../components/NavMenu";
import Footer from "../components/Footer";
import SectionBlock from "../components/section-block";
import ContainerBlock from "../components/container-block";
import BtnBlock from "../components/Btn-form-block";
import Logo from "../components/Logo";

class Auth extends React.Component {
  render() {
    const MainLinks = [
      { url: '/', text: 'ГЛАВНАЯ', id: '1', internal: true },
      { url: '/#aboutus', text: 'О НАС', id: '2', internal: false },
      { url: '/#Sale', text: 'АКЦИЯ', id: '3', internal: false },
      { url: '/#registr', text: 'РЕГИСТРАЦИЯ', id: '4', internal: false },
      { url: '/auth', text: 'ВХОД', id: '5', internal: true }
    ];
    return (
      <div className='body-bg-2'>
        <Logo />
        <NavMenu links={MainLinks} />
        <SectionBlock sectionId="" className="section-signin">
          <ContainerBlock className="container container-sign">
            <div>
              <h2>Авторизация</h2>
              <div className="form-signIn">
                <form>
                  <input type="email" placeholder="Почта" id="UserEmail" />
                  <input type="password" placeholder="Пароль" id="UserPassword" />
                  <BtnBlock type="submit" value="Войти" id="SignInBtn" />
                </form>
              </div>
            </div>
          </ContainerBlock>
        </SectionBlock>
        <Footer />
      </div>
    );
  }
}

export default Auth;
