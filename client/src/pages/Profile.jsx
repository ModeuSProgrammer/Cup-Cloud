import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { logout } from "../reducers/userReducer"
import { deleteAvatar, uploadAvatar, showAvatar } from "../actions/user";

import avatarLogo from '../assets/default.png'
import NavMenu from "../components/NavMenu";
import Footer from "../components/Footer";
import SectionBlock from "../components/section-block";
import ContainerBlock from "../components/container-block";
import ImgBlock from "../components/Img";
import Logo from "../components/Logo";

const Profile = () => {
  const dispatch = useDispatch();
  const currentProfile = useSelector(state => state.user.currentProfile);

  const avatar = currentProfile.avatar !== 'null' ? `http://localhost:8000/${currentProfile.avatar}` : avatarLogo;
  useEffect(() => {
    dispatch(showAvatar());
  }, [dispatch]);

  function changeHandler(e) {
    const file = e.target.files[0]
    dispatch(uploadAvatar(file))
  }

  const MainLinks = [
    { url: '/storage', text: 'ДИСК', id: '1', internal: true },
    { url: '/tariff', text: 'ТАРИФ', id: '2', internal: true },
    { url: '/account', text: 'АККАУНТ', id: '3', internal: true },
    { url: '/', text: 'ВЫХОД', id: '4', internal: false, onClick: () => dispatch(logout()) }
  ];
  return (
    <div className="body-bg-1">
      <Logo />
      <NavMenu links={MainLinks} />
      <SectionBlock sectionId="" className="section-account">
        <ContainerBlock className="container container-account">

          <div className="account-info">
            <div className="account-data">
              <h2>Данные об аккаунте</h2>
              <div className="account-datetag">
                <p>Имя</p>
                <p>Дата рождения</p>
                <p>Почта</p>
              </div>

              <div className="account-output">
                <p id="UserName">1</p>
                <input type="date" id="UserDay" name="date" />
                <p id="UserEmail">3</p>
              </div>
            </div>

            <div className=" btn-block">
              <label className="custom-file-upload">
                <input type="file" onChange={(e) => changeHandler(e)} />
                Загрузить фото
              </label>
              <button onClick={() => dispatch(deleteAvatar())} className="file-delete">Удалить Фотографию профиля</button>
            </div>

          </div>
          <div className="account-avatar">
            <ImgBlock filePath={avatar} className="" />
          </div>

        </ContainerBlock>
      </SectionBlock>
      <Footer />
    </div>
  );
}

export default Profile;
