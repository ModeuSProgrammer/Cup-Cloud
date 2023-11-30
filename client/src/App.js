import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Добавлены импорты
import './SCSS/main.scss';
import Main from './pages/Main';
import Login from './pages/Login';
import Drive from './pages/Drive';
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./actions/user";

function App() {
  const isAuth = useSelector(state => state.user.isAuth)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!isAuth) {
      dispatch(auth());
    }
  }, [dispatch, isAuth]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/CupCloud/" element={!isAuth ? <Main /> : <Navigate to="/CupCloud/storage" />} exact />
        <Route path="/CupCloud/login" element={!isAuth ? <Login /> : <Navigate to="/CupCloud/storage" />} />
        <Route path="/CupCloud/storage" element={<Drive />} />
      </Routes>
    </BrowserRouter >
  );
}

export default App;
