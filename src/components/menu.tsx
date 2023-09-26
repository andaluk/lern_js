import { NavLink } from 'react-router-dom';
import './menu.scss';

export const Menu = () => (
  <nav className='menuBar'>
    <img
      src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAS0lEQVR4nO3VsQ2AMAxEUQ99szAQYhhvEUTBDg68J12RzlV+FQCV41oTV6/ncfYatWx3YAaugK/IgC8lStJKAuwrA6oRJWklAfilG42Rtjxi6bnzAAAAAElFTkSuQmCC'
      alt='Menu'
      title='Меню'
    />
    <NavLink to='/'>Домой</NavLink>
    <NavLink to='/login'>Вход</NavLink>
    <NavLink to='/about'>О программе</NavLink>
  </nav>
);
