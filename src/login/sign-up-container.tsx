import React, { useState, useEffect } from "react";
import {
  sUp,
  pMail,
  pName,
  pPass,
  errMsg,
  nameRegExp,
  mailRegExp,
} from "../const";
import { Social } from "./";
import "./input.scss";

export const SignUpContainer = () => {
  // Имя пользователя при регистрации
  const [Name, setName] = useState("");

  // Почта при регистрации
  const [Mail, setMail] = useState("");

  // Пароль при регистрации
  const [Pass1, setPass1] = useState("");

  // Повторение пароля при регистрации
  const [Pass2, setPass2] = useState("");

  // Сообщение о ошибке при валидации
  const [Err, setErr] = useState(1);

  // Валидация формы регистрации
  useEffect(
    () => {
      setErr(
        [
          // Проверки валидации в порядке следования сообщений о ошибках
          !Name, // Пустое имя
          !nameRegExp(Name), // Имя должно содержать англ. буквы и цифры
          !Mail, // Пустая почта
          !mailRegExp(Mail), // Проверка формата почты
          !Pass1, // Пустой пароль
          !Pass2, // Пароль не повторили
          Pass1 !== Pass2, // Пароли не совпадают

        ].indexOf(true) + 1, // Если не найдено вернет -1, а это соответствует нулевой ошибке
      );
    },
    // Выполняется при изменении следующих состояний
    [Name, Mail, Pass1, Pass2],
  );
  return (
    <div className="form-container sign-up-container">
      <form action="#">
        <h1>Соаздайте пользователя</h1>
        <Social />

        <input // Имя
          type="text"
          placeholder={pName}
          /* Устанавливаем состояние "Имя" */
          onChange={(e) => setName(e.target.value)}
        />

        <input // Почта
          type="email"
          placeholder={pMail}
          // Устанавливаем состояние "Почта"
          onChange={(e) => setMail(e.target.value)}
        />

        <input // Пароль
          type="password"
          placeholder={pPass}
          // Устанавливаем состояние "Пароль"
          onChange={(e) => setPass1(e.target.value)}
        />

        <input // Повтор пароля
          type="password"
          placeholder={pPass}
          // Устанавливаем состояние "Повтор пароля"
          onChange={(e) => setPass2(e.target.value)}
        />

        {Err ? (
          <div className="errMessage">{errMsg[Err]}</div>
        ) : (
          <button>{sUp}</button>
        )}
      </form>
    </div>
  );
};
