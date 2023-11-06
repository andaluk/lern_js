import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLazyGetLogonDataQuery } from '../../services/getLogonDataQuery'
import { useDispatch } from 'react-redux'
import { setLoginData as setLoginDataAction } from '../../slices'
import {
  sUp,
  pMail,
  pName,
  pPass,
  errMsg,
  nameRegExp,
  mailRegExp,
} from '../../const'
import { Social } from './'
import './input.scss'

export const SignUpContainer = () => {
  // Получаем диспетчер хранилища
  const dispatch = useDispatch()

  // Имя пользователя при регистрации
  const [Name, setName] = useState('')

  // Почта при регистрации
  const [Mail, setMail] = useState('')

  // Пароль при регистрации
  const [Pass1, setPass1] = useState('')

  // Повторение пароля при регистрации
  const [Pass2, setPass2] = useState('')

  // Сообщение о ошибке при валидации
  const [Err, setErr] = useState(1)

  const navigate = useNavigate()

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
      )
    },
    // Выполняется при изменении следующих состояний
    [Name, Mail, Pass1, Pass2],
  )

  // Обработчик изменения поля имени
  const NameHandler = (e: { target: { value: string } }) =>
    setName(e.target.value)

  // Обработчик изменения поля почты
  const MailHandler = (e: { target: { value: string } }) =>
    setMail(e.target.value)

  // Обработчик изменения поля первого пароля
  const Pass1Handler = (e: { target: { value: string } }) =>
    setPass1(e.target.value)

  // Обработчик изменения поля второго пароля
  const Pass2Handler = (e: { target: { value: string } }) =>
    setPass2(e.target.value)

  // Получаем функцию запроса данных о пользователе и другие параметры
  const [
    logonDataQuery,
    {
      data: logonData,
      isError: logonDataError,
      isSuccess: logonDataSuccess,
      error: logonDataErrorMsg,
    },
  ] = useLazyGetLogonDataQuery()

  // При запросе данных о пользователе произошла ошибка
  if (logonDataError) {
    console.error('loginDataError: ' + logonDataErrorMsg)
  }

  // Зпрос данных о пользователе выполнен без ошибок
  if (logonDataSuccess) {
    dispatch(setLoginDataAction(logonData))
    navigate('/')
  }

  // Обработчик запроса регистрации
  const submitHandler = (e: any) => {
    // Без этого последующий запрос блокируется (в Firefox)
    e.preventDefault()
    logonDataQuery({ Name, Mail, Pass1 })
  }
  return (
    <div className='form-container sign-up-container'>
      <form onSubmit={submitHandler}>
        <h2>Соаздайте пользователя</h2>
        <Social />

        <input // Имя
          type='text'
          placeholder={pName}
          /* Устанавливаем состояние "Имя" */
          onChange={NameHandler}
        />

        <input // Почта
          type='email'
          placeholder={pMail}
          // Устанавливаем состояние "Почта"
          onChange={MailHandler}
        />

        <input // Пароль
          type='password'
          placeholder={pPass}
          // Устанавливаем состояние "Пароль"
          onChange={Pass1Handler}
        />

        <input // Повтор пароля
          type='password'
          placeholder={pPass}
          // Устанавливаем состояние "Повтор пароля"
          onChange={Pass2Handler}
        />

        {Err ? (
          <div className='errMessage'>{errMsg[Err]}</div>
        ) : (
          <button>{sUp}</button>
        )}
      </form>
    </div>
  )
}
