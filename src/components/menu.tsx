import { NavLink } from 'react-router-dom'
import './menu.scss'
import { APP_TITLE } from '../const'
import { useDispatch, useSelector } from 'react-redux'
import store from '../store'
import { clearLoginData } from '../slices'

// Общее меню
export const Menu = () => {
  const login = useSelector(
    (state: ReturnType<typeof store.getState>) =>
      state.Reducer.loginDataReducer.loginData,
  )
  // Получаем диспетчер хранилища
  const dispatch = useDispatch()

  const LogOff = () => {
    console.log('Завершаем сессию.')
    dispatch(clearLoginData())
  }
  return (
    <nav className='menuBar'>
      <img
        src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAS0lEQVR4nO3VsQ2AMAxEUQ99szAQYhhvEUTBDg68J12RzlV+FQCV41oTV6/ncfYatWx3YAaugK/IgC8lStJKAuwrA6oRJWklAfilG42Rtjxi6bnzAAAAAElFTkSuQmCC'
        alt='Menu'
        title='Меню'
      />
      {login ? (
        <>
          <div>Пользователь: {login.Mail}</div>
          <button onClick={LogOff}>Выйти</button>
        </>
      ) : (
        <div>Пользователь не вошел</div>
      )}
      <hr />
      <NavLink to='/login'>Вход</NavLink>
      <NavLink to='/'>{APP_TITLE}</NavLink>
      <NavLink to='/about'>О программе</NavLink>
      <NavLink to='/e404'>Ошибка 404</NavLink>
    </nav>
  )
}
