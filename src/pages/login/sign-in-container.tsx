import React, { useState, useEffect } from 'react'
import { sIn, pMail, pPass, errMsg, mailRegExp } from '../../const'
import { Social } from './'
import './input.scss'
import { useNavigate } from 'react-router-dom'
import { useLazyGetLoginDataQuery } from '../../services/getLoginDataQuery'
import { useDispatch } from 'react-redux'
import { setLoginData as setLoginDataAction } from '../../slices'

export const SignInContainer = () => {
  // Получаем диспетчер хранилища
  const dispatch = useDispatch()

  // Почта при входе
  const [Mail, setMail] = useState('')

  // Пароль при входе
  const [Pass, setPass] = useState('')

  // Сообщение о ошибке при валидации
  const [Err, setErr] = useState(1)

  const navigate = useNavigate()

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
      )
    },
    // Выполняется при изменении следующих состояний
    [Mail, Pass],
  )

  // Обработчик изменения поля почты
  const onMailHandler = (e: { target: { value: string } }) =>
    setMail(e.target.value)

  // Обработчик изменения поля пароля
  const onPassHandler = (e: { target: { value: string } }) =>
    setPass(e.target.value)

  // Получаем функцию запроса данных о пользователе и другие параметры
  const [
    loginDataQuery,
    {
      data: loginData,
      isError: loginDataError,
      isSuccess: loginDataSuccess,
      error: loginDataErrorMsg,
    },
  ] = useLazyGetLoginDataQuery()

  // При запросе данных о пользователе произошла ошибка
  if (loginDataError) {
    console.error('loginDataError: ' + loginDataErrorMsg)
  }

  // Зпрос данных о пользователе выполнен без ошибок
  if (loginDataSuccess) {
    dispatch(setLoginDataAction(loginData))
    navigate('/')
  }

  // Обработчик операции входа
  const submitHandler = (e: any) => {
    // Без этого последующий запрос блокируется (в Firefox)
    e.preventDefault()
    loginDataQuery({ email: Mail, pass: Pass })
  }
  return (
    <div className='form-container sign-in-container'>
      <form onSubmit={submitHandler}>
        <h2>Вход</h2>
        <Social />

        <input // Почта
          type='email'
          placeholder={pMail}
          // Устанавливаем состояние "Почта"
          onChange={onMailHandler}
        />

        <input // Пароль
          type='password'
          placeholder={pPass}
          // Устанавливаем состояние "Пароль"
          onChange={onPassHandler}
        />

        {Err ? (
          <div className='errMessage'>{errMsg[Err]}</div>
        ) : (
          <button>{sIn}</button>
        )}
      </form>
    </div>
  )
}
