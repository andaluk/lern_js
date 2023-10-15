import React from 'react';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import './index.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login, Err404, Weather, About } from './pages';

// Создаем корневой компонент и помещаем в него BrowserRouter
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' Component={Weather} />
      <Route path='/login' Component={Login} />
      <Route path='/about' Component={About} />
      <Route path='*' Component={Err404} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
