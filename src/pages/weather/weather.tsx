import React, { useState } from 'react';
import './weather.scss';
import {
  WeatherTable,
  WeatherChart,
  GeoObjectSearch,
  GeoObjectContext,
  WeatherDataContext,
  geoObjectType,
  weatherDataType,
  AppFrame,
  Menu,
} from './';

const Weather = () => {
  const geoObjectState = useState<geoObjectType>(undefined);
  const weatherDataState = useState<weatherDataType>(undefined);

  return (
    <GeoObjectContext.Provider value={geoObjectState}>
      <WeatherDataContext.Provider value={weatherDataState}>
        <Menu />
        <div className='weather'>
          <AppFrame head1='Сервис данных погоды.' className='weatherInput'>
            <GeoObjectSearch />
          </AppFrame>
          <AppFrame className='weatherData'>
            <WeatherTable />
          </AppFrame>
          <AppFrame className='weatherChart'>
            <WeatherChart />
          </AppFrame>
        </div>
      </WeatherDataContext.Provider>
    </GeoObjectContext.Provider>
  );
};
export default Weather;
