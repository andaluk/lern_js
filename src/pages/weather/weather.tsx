import React, { useEffect } from 'react'
import './weather.scss'
import { WeatherTable, WeatherChart, GeoObjectSearch, AppFrame, Menu } from './'
import { APP_TITLE } from '../../const'

const Weather = () => {
  // Устанавливаем заголовок окна
  useEffect(() => {
    document.title = APP_TITLE + '.'
  }, [])

  return (
    <>
      <Menu />
      <div className='weather'>
        <AppFrame head1={APP_TITLE + '.'} className='weatherInput'>
          <GeoObjectSearch />
        </AppFrame>
        <AppFrame className='weatherData'>
          <WeatherTable />
        </AppFrame>
        <AppFrame className='weatherChart'>
          <WeatherChart />
        </AppFrame>
      </div>
    </>
  )
}
export default Weather
