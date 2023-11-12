import React from 'react'
import { useSelector } from 'react-redux'
import store from '../../store'

export const WeatherTable = () => {
  const weatherData = useSelector(
    (state: ReturnType<typeof store.getState>) =>
      state.Reducer.weatherDataReducer.weatherData,
  )
  const hourly = weatherData ? weatherData.hourly : undefined
  return (
    <>
      {hourly ? (
        <table>
          {/* Перебираем дни */}
          {[...hourly.map.keys()].map((d) => (
            <tbody key={`b${d}`}>
              <tr>
                <th key={`h${d}`}>{d}</th>
                {/* Перебираем номера показаний за день и печатаем час*/}
                {hourly.map.get(d)!.map((i) => (
                  <th key={`h${d}_${i}`} title='Время [часов]'>
                    {new Date(hourly.time[i]).toLocaleTimeString([], {
                      hour: '2-digit',
                    })}
                  </th>
                ))}
              </tr>
              <tr>
                <th key={`pm 2,5${d}`}>pm 2,5</th>
                {/* Перебираем номера показаний за день и печатаем показания */}
                {hourly.map.get(d)!.map((i) => (
                  <td key={`dpm 2,5${d}_${i}`}>{hourly.pm2_5[i]}</td>
                ))}
              </tr>
              <tr>
                <th key={`pm 10${d}`}>pm 10</th>
                {/* Перебираем номера показаний за день и печатаем показания */}
                {hourly.map.get(d)!.map((i) => (
                  <td key={`dpm 10${d}_${i}`}>{hourly.pm10[i]}</td>
                ))}
              </tr>
            </tbody>
          ))}
        </table>
      ) : (
        ''
      )}
    </>
  )
}
