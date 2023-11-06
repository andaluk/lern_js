import React from "react"
import "./weather.scss"
import { WeatherTable, WeatherChart, GeoObjectSearch, AppFrame, Menu } from "./"

const Weather = () => {
  return (
    <>
      <Menu />
      <div className="weather">
        <AppFrame head1="Сервис данных погоды." className="weatherInput">
          <GeoObjectSearch />
        </AppFrame>
        <AppFrame className="weatherData">
          <WeatherTable />
        </AppFrame>
        <AppFrame className="weatherChart">
          <WeatherChart />
        </AppFrame>
      </div>
    </>
  )
}
export default Weather
