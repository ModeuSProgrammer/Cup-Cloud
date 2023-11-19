import React from "react";
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import './SCSS/main.scss';

const App = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
