import React, { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"

import { logout } from "../reducers/userReducer"
import { deleteAvatar, uploadAvatar, showData } from "../actions/user"

import avatarLogo from '../assets/default.png'
import SectionBlock from "../components/section-block"
import ContainerBlock from "../components/container-block"
import ImgBlock from "../components/Img"

const Profile = () => {
  const dispatch = useDispatch()
  const currentProfile = useSelector(state => state.user.currentProfile)

  const avatar = currentProfile.avatar !== 'null' ? `http://localhost:8000/${currentProfile.avatar}` : avatarLogo
  useEffect(() => {
    dispatch(showData())
  }, [dispatch])

  function changeHandler(e) {
    const file = e.target.files[0]
    dispatch(uploadAvatar(file))
      .then(() => dispatch(showData()))
  }
  function deleteHandler() {
    dispatch(deleteAvatar())
      .then(() => dispatch(showData()))
  }

  const name = useSelector(state => state.user.currentProfile.firstname)
  const email = useSelector(state => state.user.currentProfile.email)

  return (
    <div className="page">
      <div className="body-bg-1">

        <header>
          <div className="header-width">
            <Link to="/">
              <div className="header-logo">
                <ImgBlock filePath="../img/logoCupCloud.svg" /><h4>CUP CLOUD</h4>
              </div>
            </Link>
            <div className="menu-base">
              <nav className="nav">
                <ul className="nav-list">
                  <li className="nav-item"><Link to="/storage">ДИСК</Link></li>
                  <li className="nav-item"> <Link to="/tariff">ТАРИФ</Link></li>
                  <li className="nav-item"> <Link to="/account">АККАУНТ</Link></li>
                  <li className="nav-item" > <Link to="/" onClick={() => dispatch(logout())}>ВЫХОД</Link></li>
                </ul>
              </nav>
            </div>
          </div>
        </header>



        <SectionBlock sectionId="" className="section-account">
          <ContainerBlock className="container container-account">

            <div className="account-info">
              <div className="account-data">
                <h2>Данные об аккаунте</h2>
                <div className="account-datetag">
                  <p>Имя</p>
                  <p>Почта</p>
                  <p>Пол</p>
                  <p>Количество полных лет</p>
                  <p>Место на диске</p>
                  <p>Количество заметок</p>
                </div>

                <div className="account-output">
                  <p id="UserName">{name}</p>
                  <p id="UserEmail">{email}</p>
                </div>
              </div>

              <div className=" btn-block">
                <label className="custom-file-upload">
                  <input type="file" onChange={(e) => changeHandler(e)} />
                  Загрузить фото
                </label>
                <button onClick={deleteHandler} className="file-delete">Удалить Фотографию профиля</button>
              </div>

            </div>
            <div className="account-avatar">
              <ImgBlock filePath={avatar} className="" />
            </div>

          </ContainerBlock>
        </SectionBlock>

      </div>
    </div>
  )
}

export default Profile 
