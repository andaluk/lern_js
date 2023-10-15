import React, { useContext } from 'react';
import { WeatherDataContext } from './';

export const WeatherTable = () => {
  const [weatherData] = useContext(WeatherDataContext);
  const hourly = weatherData ? weatherData.hourly : undefined;
  return (
    <>
      {hourly ? (
        <table>
          {/* Перебираем дни */}
          {[...hourly.map.keys()].map((d) => (
            <tbody>
              <tr>
                <th>{d}</th>
                {/* Перебираем номера показаний за день и печатаем час*/}
                {hourly.map.get(d)!.map((i) => (
                  <th title='Время [часов]'>
                    {new Date(hourly.time[i]).toLocaleTimeString([], {
                      hour: '2-digit',
                    })}
                  </th>
                ))}
              </tr>
              <tr>
                <th>pm 2,5</th>
                {/* Перебираем номера показаний за день и печатаем показания */}
                {hourly.map.get(d)!.map((i) => (
                  <td>{hourly.pm2_5[i]}</td>
                ))}
              </tr>
              <tr>
                <th>pm 10</th>
                {/* Перебираем номера показаний за день и печатаем показания */}
                {hourly.map.get(d)!.map((i) => (
                  <td>{hourly.pm10[i]}</td>
                ))}
              </tr>
            </tbody>
          ))}
        </table>
      ) : (
        ''
      )}
    </>
  );
};
