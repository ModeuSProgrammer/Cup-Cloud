import React, { useState } from "react";
import { registr } from "../actions/user";

import NavMenu from "../components/NavMenu";
import Footer from "../components/Footer";
import SectionBlock from "../components/section-block";
import ContainerBlock from "../components/container-block";
import Logo from "../components/Logo";


const Registration = () => {
  //для redux
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [firstname, setFirstName] = useState("");

  const MainLinks = [
    { url: '/', text: 'ГЛАВНАЯ', id: '1', internal: false },
    { url: '/#aboutus', text: 'О НАС', id: '2', internal: false },
    { url: '/#Sale', text: 'АКЦИЯ', id: '3', internal: false },
    { url: '/registration', text: 'РЕГИСТРАЦИЯ', id: '4', internal: false },
    { url: '/login', text: 'ВХОД', id: '5', internal: true }
  ];
  return (
    <div className='body-bg-2'>
      <Logo />
      <NavMenu links={MainLinks} />
      <SectionBlock sectionId="" className="section-reg">
        <ContainerBlock className="container container-sign">
          <div>
            <h2>Регистрация</h2>
            <div className="registr-form">
              <form method="post" onSubmit={(event) => { event.preventDefault(); registr(email, password, passwordTwo, firstname); }}>
                <input type="text" value={firstname} placeholder="Имя" id="firstName" onChange={(event) => setFirstName(event.target.value)} />
                <input type="email" value={email} placeholder="Почта" id="Email" onChange={(event) => setEmail(event.target.value)} />
                <input type="password" value={password} placeholder="Пароль" id="Password" onChange={(event) => setPassword(event.target.value)} />
                <input type="password" value={passwordTwo} placeholder="Повторите пароль" id="PasswordTwo" onChange={(event) => setPasswordTwo(event.target.value)} />
                <input type="submit" value="Зарегистрироваться" id="RegBtn" />
              </form>

            </div>
          </div>
        </ContainerBlock>
      </SectionBlock>
      <Footer />
    </div>
  );
}

export default Registration;
