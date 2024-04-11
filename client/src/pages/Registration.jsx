import React, { useState } from "react"
import { registration, login } from "../actions/user"
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux"

import SectionBlock from "../components/section-block"
import ContainerBlock from "../components/container-block"
import ImgBlock from "../components/Img"


const Registration = () => {

  const dispatch = useDispatch()
  //registration
  const [RegEmail, setRegEmail] = useState("")
  const [RegPass, setRegPass] = useState("")
  const [RegPassTwo, setRegPassTwo] = useState("")
  const [firstname, setFirstname] = useState("")

  //sign in
  const [LogEmail, setLogEmail] = useState("")
  const [LogPass, setLogPass] = useState("")
  const [SignIn, SetSignIn] = useState("");

  async function handlerClearReg() {
    setRegEmail('')
    setRegPass('')
    setRegPassTwo('')
    setFirstname('')
  }

  return (
    <div className="page body-bg-2">
      <div className='body-bg-2'>

        <header>
          <div className="header-width">
            <span />
            <Link to="/">
              <div className="header-logo">
                <ImgBlock filePath="../img/logoCupCloud.svg" /><h4>CUP CLOUD</h4>
              </div>
            </Link>
            <div className="menu-base">
              <nav className="nav">
                <ul className="nav-list">
                  <li className="nav-item"><Link to="/">ГЛАВНАЯ</Link></li>
                  <li className="nav-item"> <Link to="/registration">АВТОРИЗАЦИЯ | РЕГИСТРАЦИЯ</Link></li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        {SignIn ? (
          <SectionBlock sectionId="" className="section-reg">
            <ContainerBlock className="container container-sign">
              <div>
                <h2>Регистрация</h2>
                <div className="registr-form">

                  <form onSubmit={(e) => { e.preventDefault(); }}>
                    <input type="text" value={firstname} placeholder="Имя" onChange={(event) => setFirstname(event.target.value)} />
                    <input type="email" value={RegEmail} placeholder="Почта" onChange={(event) => setRegEmail(event.target.value)} />
                    <input type="password" value={RegPass} placeholder="Пароль" onChange={(event) => setRegPass(event.target.value)} />
                    <input type="password" value={RegPassTwo} placeholder="Повторите пароль" onChange={(event) => setRegPassTwo(event.target.value)} />
                    <input type="submit" value="Зарегистрироваться" onClick={() => { registration(RegEmail, RegPass, RegPassTwo, firstname); handlerClearReg() }} />
                    <button className="change-button" onClick={() => SetSignIn(false)}>Уже есть аккаунт?</button>
                  </form>
                </div>
              </div>
            </ContainerBlock>
          </SectionBlock>
        )
          :
          (
            <SectionBlock sectionId="" className="section-signin">
              <ContainerBlock className="container container-sign">
                <div>
                  <h2>Авторизация</h2>
                  <div className="form-signIn">
                    <form onSubmit={(e) => { e.preventDefault(); }}>
                      <input type="email" value={LogEmail} placeholder="Почта" onChange={(event) => setLogEmail(event.target.value)} />
                      <input type="password" value={LogPass} placeholder="Пароль" onChange={(event) => setLogPass(event.target.value)} />
                      <input type="submit" value="Войти" onClick={() => { dispatch(login(LogEmail, LogPass)) }} />
                      <button type="submit" className="change-button" onClick={() => SetSignIn(true)}>Нет аккаунта?</button>
                    </form>
                  </div>
                </div>
              </ContainerBlock>
            </SectionBlock>
          )}
      </div>
    </div>
  )
}

export default Registration 
