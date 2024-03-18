import './SCSS/main.scss'
import React, { useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'  // Добавлены импорты
import { jwtDecode } from 'jwt-decode'
import Main from './pages/Main'
import Drive from './pages/Drive'
import Tariff from './pages/Tariff'
import Profile from './pages/Profile'
import Registration from './pages/Registration'
import Notes from './pages/Notes'
import Admin from './pages/Admin'

import { useDispatch, useSelector } from "react-redux"
import { auth } from "./actions/user"
import { setUser } from './reducers/userReducer'

function App() {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!isAuth & token) {
      dispatch(auth())
    }
  }, [dispatch, isAuth])

  let token = localStorage.getItem('token')
  let decodedToken

  useEffect(() => {
    const DataUser = () => {
      if (token) {
        decodedToken = jwtDecode(token);
        let user = decodedToken
        dispatch(setUser(user));
      }
    }
    DataUser()
  }, [token, dispatch])
  const roleID = useSelector(state => state.user.currentUser.roleID)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!isAuth ? <Main /> : <Navigate to="/storage" />} />
        <Route path="/registration" element={!isAuth ? <Registration /> : <Navigate to="/storage" />} />
        <Route path="/storage" element={isAuth ? <Drive /> : <Navigate to="/registration" />} />
        <Route path="/tariff" element={isAuth ? <Tariff /> : <Navigate to="/registration" />} />
        <Route path="/account" element={isAuth ? <Profile /> : <Navigate to="/registration" />} />
        <Route path="/notes" element={isAuth ? <Notes /> : <Navigate to="/registration" />} />
        <Route path="/admin" element={isAuth ? (roleID == 2 ? <Admin /> : <Navigate to="/storage" />) : <Navigate to="/registration" />} />
      </Routes>
    </BrowserRouter >
  )
}

export default App 
