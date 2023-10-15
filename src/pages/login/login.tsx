import React, { useState } from 'react';
import { SignUpContainer, SignInContainer, AppFrame } from './';
import { sIn, sUp, ghClass } from '../../const';
import './login.scss';

const Login = () => {
  // Форма переключена на регистрацию
  const [isSignUp, setSignUp] = useState(false);
  // Обработчик перехода на форму входа
  const ButtonSinClickHandler = () => setSignUp(false);
  // Обработчик перехода на форму регистрации
  const ButtonSupClickHandler = () => setSignUp(true);
  return (
    <>
      <AppFrame
        head1='Форма входа/регистрации'
        /* Переключаем с регистрации на вход и обратно за счет добавления класса css */
        className={'loginFrame' + (isSignUp ? ' right-panel-active' : '')}
      >
        <SignUpContainer />
        <SignInContainer />
        <div className='overlay-container'>
          <div className='overlay'>
            <div className='overlay-panel overlay-left'>
              <h2>Уже зарегистрированы?</h2>
              <p>Вернуться к входу.</p>
              <button className={ghClass} onClick={ButtonSinClickHandler}>
                {sIn}
              </button>
            </div>
            <div className='overlay-panel overlay-right'>
              <h2>Еще не регистрировались?</h2>
              <p>Введите свои данные для регистрации.</p>
              <button className={ghClass} onClick={ButtonSupClickHandler}>
                {sUp}
              </button>
            </div>
          </div>
        </div>
      </AppFrame>
    </>
  );
};

export default Login;
