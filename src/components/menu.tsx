import { NavLink } from 'react-router-dom'
import './menu.scss'
import { APP_TITLE } from '../const'

// Общее меню
export const Menu = () => (
  <nav className='menuBar'>
    <img
      src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAS0lEQVR4nO3VsQ2AMAxEUQ99szAQYhhvEUTBDg68J12RzlV+FQCV41oTV6/ncfYatWx3YAaugK/IgC8lStJKAuwrA6oRJWklAfilG42Rtjxi6bnzAAAAAElFTkSuQmCC'
      alt='Menu'
      title='Меню'
    />
    <NavLink to='/login'>Вход</NavLink>
    <NavLink to='/'>{APP_TITLE}</NavLink>
    <NavLink to='/about'>О программе</NavLink>
    <NavLink to='/e404'>Ошибка 404</NavLink>
  </nav>
)
