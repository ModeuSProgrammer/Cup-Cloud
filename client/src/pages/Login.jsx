import React, { useState } from "react";
import { login } from "../actions/user";
import { useDispatch } from "react-redux";

import NavMenu from "../components/NavMenu";
import Footer from "../components/Footer";
import SectionBlock from "../components/section-block";
import ContainerBlock from "../components/container-block";
import Logo from "../components/Logo";


const Login = () => {
  //для redux
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const MainLinks = [
    { url: '/CupCloud', text: 'ГЛАВНАЯ', id: '1', internal: true },
    { url: '/CupCloud/#aboutus', text: 'О НАС', id: '2', internal: false },
    { url: '/CupCloud/#Sale', text: 'АКЦИЯ', id: '3', internal: false },
    { url: '/CupCloud/#registr', text: 'РЕГИСТРАЦИЯ', id: '4', internal: false },
    { url: '/CupCloud/login', text: 'ВХОД', id: '5', internal: false }
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
                <input type="email" value={email} placeholder="Почта" id="UserEmail" onChange={(event) => setEmail(event.target.value)} />
                <input type="password" value={password} placeholder="Пароль" id="UserPassword" onChange={(event) => setPassword(event.target.value)} />
                <input type="submit" value="Войти" id="SignInBtn" onClick={() => dispatch(login(email, password))} />
              </form>
            </div>
          </div>
        </ContainerBlock>
      </SectionBlock>
      <Footer />
    </div>
  );
}

export default Login;
