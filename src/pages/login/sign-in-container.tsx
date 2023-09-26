import React, { useState, useEffect } from "react";
import { sIn, pMail, pPass, errMsg, mailRegExp } from "../../const";
import { Social } from "./";
import "./input.scss";

export const SignInContainer = () => {
  // Почта при входе
  const [Mail, setMail] = useState("");

  // Пароль при входе
  const [Pass, setPass] = useState("");

  // Сообщение о ошибке при валидации
  const [Err, setErr] = useState(1);

  // Валидация формы регистрации
  useEffect(
    () => {
      setErr(
        [
          // Проверки валидации в порядке следования сообщений о ошибках
          false, // Пустое имя
          false, // Имя должно содержать англ. буквы и цифры
          !Mail, // Пустая почта
          // Проверка формата почты
          !mailRegExp(Mail),
          !Pass, // Пустой пароль

        ].indexOf(true) + 1, // Если не найдено вернет -1, а это соответствует нулевой ошибке
      );
    },
    // Выполняется при изменении следующих состояний
    [Mail, Pass],
  );
  const onMailHandler = (e:{target:{value:string}}) => setMail(e.target.value)
  const onPassHandler = (e:{target:{value:string}}) => setPass(e.target.value)
  return (
    <div className="form-container sign-in-container">
      <form action="#">
        <h2>Вход</h2>
        <Social />

        <input // Почта
          type="email"
          placeholder={pMail}
          // Устанавливаем состояние "Почта"
          onChange={onMailHandler}
        />

        <input // Пароль
          type="password"
          placeholder={pPass}
          // Устанавливаем состояние "Пароль"
          onChange={onPassHandler}
        />

        {Err ? (
          <div className="errMessage">{errMsg[Err]}</div>
        ) : (
          <button>{sIn}</button>
        )}
      </form>
    </div>
  );
};
