import React, { useState } from "react";
import { MailInput, NameInput, PasswdInput, Social } from "./";
import { sIn, sUp, ghClass } from "../const";
import './login.scss'

const Login = () => {
  const [isSignUp, setSignUp] = useState(false);
  return (
    <>
      <h2>Форма входа/регистрации</h2>
      <div className={"loginContainer" + (isSignUp ? " right-panel-active" : "")}>
        <div className="form-container sign-up-container">
          <form action="#">
            <h1>Соаздайте пользователя</h1>
            <Social />
            <span>или используйте свой E-mail для регистрации</span>
            <NameInput />
            <MailInput />
            <PasswdInput />
            <PasswdInput />
            <button>{sUp}</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>Вход</h1>
            <Social />
            <span>или испольуйте свои регистрационные данные</span>
            <MailInput />
            <PasswdInput />
            <a href="#">Забыли пароль</a>
            <button>{sIn}</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Уже зарегистрированы?</h1>
              <p>Вернуться к входу.</p>
              <button className={ghClass} onClick={() => setSignUp(false)}>
                {sIn}
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Еще не регистрировались?</h1>
              <p>Введите свои данные для регистрации.</p>
              <button className={ghClass} onClick={() => setSignUp(true)}>
                {sUp}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
