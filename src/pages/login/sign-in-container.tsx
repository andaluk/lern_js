import React, { useState, useEffect } from 'react'
import { sIn, pMail, pPass, errMsg } from '../../const'
import { mailMatch } from './match'
import { Social } from './'
import './input.scss'
import { useNavigate } from 'react-router-dom'
import {
  loginDataAPI,
  useLazyGetLoginDataQuery,
} from '../../services/getLoginDataQuery'
import { useDispatch } from 'react-redux'
import { setLoginData as setLoginDataAction } from '../../slices'
import { Button } from '../../stories/Button'

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

  // Обработчик изменения поля почты
  const onMailHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setMail(e.target.value)

  // Обработчик изменения поля пароля
  const onPassHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
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
  if (loginDataError && loginDataErrorMsg) {
    console.error('loginDataError: ', loginDataErrorMsg)
  }

  // Зпрос данных о пользователе выполнен без ошибок
  if (loginDataSuccess) {
    dispatch(setLoginDataAction(loginData))
    navigate('/')
  }

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
          !mailMatch(Mail),
          !Pass, // Пустой пароль
        ].indexOf(true) + 1, // Если не найдено вернет -1, а это соответствует нулевой ошибке
      )
      dispatch(loginDataAPI.util.resetApiState())
    },
    // Выполняется при изменении следующих состояний
    [Mail, Pass, dispatch],
  )

  // Обработчик операции входа
  const submitHandler = () => {
    loginDataQuery({ Mail, Pass })
  }
  return (
    <div className='form-container sign-in-container'>
      <form>
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
        ) : loginDataErrorMsg &&
          'data' in loginDataErrorMsg &&
          loginDataErrorMsg.data ? (
          <div className='errMessage'>{String(loginDataErrorMsg.data)}</div>
        ) : (
          <Button onClick={submitHandler} label={sIn} />
        )}
      </form>
    </div>
  )
}
