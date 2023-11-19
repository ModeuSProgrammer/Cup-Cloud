import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserDrive from './drive/UserDrive';


export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider value={{
      user: new UserDrive()
    }}>
      <App />
    </Context.Provider>
  </React.StrictMode>
);

