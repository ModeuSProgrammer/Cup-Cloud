import './SCSS/main.scss'
import React, { useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'  // Добавлены импорты
import Main from './pages/Main'
import Drive from './pages/Drive'
import Tariff from './pages/Tariff'
import Profile from './pages/Profile'
import Registration from './pages/Registration'
import { useDispatch, useSelector } from "react-redux"
import { auth } from "./actions/user"

function App() {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!isAuth) {
      dispatch(auth())
    }
  }, [dispatch, isAuth])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!isAuth ? <Main /> : <Navigate to="/storage" />} />
        <Route path="/registration" element={!isAuth ? <Registration /> : <Navigate to="/storage" />} />
        <Route path="/storage" element={isAuth ? <Drive /> : <Navigate to="/registration" />} />
        <Route path="/tariff" element={isAuth ? <Tariff /> : <Navigate to="/registration" />} />
        <Route path="/account" element={isAuth ? <Profile /> : <Navigate to="/registration" />} />
      </Routes>
    </BrowserRouter >
  )
}

export default App 
