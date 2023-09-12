import React, { useState } from "react";
import { SignUpContainer, SignInContainer } from "./";
import { sIn, sUp, ghClass } from "../const";
import "./login.scss";

const Login = () => {
  // Форма переключена на регистрацию
  const [isSignUp, setSignUp] = useState(false);

  return (
    <>
      <h2>Форма входа/регистрации</h2>
      <div
        /* Переключаем с регистрации на вход и обратно за счет добавления класса css */
        className={"msgFrame" + (isSignUp ? " right-panel-active" : "")}
      >
        <SignUpContainer />
        <SignInContainer />
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
