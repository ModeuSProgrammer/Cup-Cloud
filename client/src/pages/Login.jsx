import React, { useState, useEffect } from "react";
import { login } from "../actions/user";
import { useDispatch } from "react-redux";

import NavMenu from "../components/NavMenu";
import Footer from "../components/Footer";
import SectionBlock from "../components/section-block";
import ContainerBlock from "../components/container-block";
import Logo from "../components/Logo";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await dispatch(login(email, password));
      setLoggedIn(true);
    } catch (e) {
      console.error("Login failed:", e);
      setError(e.response?.data.message || "Произошла ошибка при входе");
    }
  };

  // Добавим useEffect для обновления компонента после успешного входа
  useEffect(() => {
    if (loggedIn) { }
  }, [loggedIn]);


  const MainLinks = [
    { url: '/CupCloud', text: 'ГЛАВНАЯ', id: '1', internal: true },
    { url: '/CupCloud/#aboutus', text: 'О НАС', id: '2', internal: false },
    { url: '/CupCloud/#Sale', text: 'АКЦИЯ', id: '3', internal: false },
    { url: '/CupCloud/#registr', text: 'РЕГИСТРАЦИЯ', id: '4', internal: false },
    { url: '/CupCloud/login', text: 'ВХОД', id: '5', internal: true }
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
              <form onSubmit={(e) => { e.preventDefault(); dispatch(login(email, password)); }}>
                <input type="email" value={email} placeholder="Почта" id="UserEmail" onChange={(event) => setEmail(event.target.value)} />
                <input type="password" value={password} placeholder="Пароль" id="UserPassword" onChange={(event) => setPassword(event.target.value)} />
                <input type="submit" value="Войти" id="SignInBtn" />
              </form>
            </div>
            {error && <div className="error-message">{error}</div>}
          </div>
        </ContainerBlock>
      </SectionBlock>
      <Footer />
    </div>
  );
}

export default Login;
