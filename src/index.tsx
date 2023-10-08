import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserContext, UserType } from './userstore';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const RootElement = () => {
  // получаем пару значение и функцию присвоения для имени пользователя
  const userState = useState<UserType>(undefined);
  return (
    <React.StrictMode>
      <UserContext.Provider
        value={
          // сохраняем пару значение и функцию присвоения для имени пользователя в контекст
          userState
        }
      >
        <App />
      </UserContext.Provider>
    </React.StrictMode>
  );
};

root.render(<RootElement />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
