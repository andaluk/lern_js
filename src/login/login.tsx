import React, { useState } from "react";
import { SinUpContainer,SinInContainer } from "./";
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
        className={"loginContainer" + (isSignUp ? " right-panel-active" : "")}
      >
        <SinUpContainer />
        <SinInContainer />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Уже зарегистрированы?</h1>
              <p>Вернуться к входу.</p>
              <input
                type="submit"
                className={"button " + ghClass}
                onClick={() => setSignUp(false)}
                value={sIn}
              />
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Еще не регистрировались?</h1>
              <p>Введите свои данные для регистрации.</p>
              <input
                type="submit"
                className={"button " + ghClass}
                onClick={() => setSignUp(true)}
                value={sUp}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
