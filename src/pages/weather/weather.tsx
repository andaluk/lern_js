import React, { useState } from 'react';
import {
  API_URL_GEO_DATA,
  API_KEY_YANDEX,
  API_URL_METEO_DATA,
} from '../../const';
import { AppFrame, Menu } from '../../components';
import './weather.scss';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

const Weather = () => {
  const [geoObject, setGeoObject] = useState<
    { name: string; Point: { pos: string } } | undefined
  >(undefined);
  const [weatherData, setWeatherData] = useState<
    | {
        hourly: {
          time: string[];
          map: Map<string, number[]>;
          pm2_5: number[];
          pm10: number[];
        };
      }
    | undefined
  >(undefined);
  const fetchurl = (u: string, s: any) => {
    const r = new URL(u);
    r.search = new URLSearchParams(s).toString();
    return fetch(r.toString()).then((resp) => resp.json());
  };
  const reduceFunc = (
    accom: Map<string, number[]>,
    value: string,
    index: number
  ) => {
    const d = new Date(value).toLocaleDateString();
    if (!accom.has(d)) {
      accom.set(d, []);
    }
    const ag = accom.get(d);
    if (ag) {
      ag.push(index);
    }
    return accom;
  };
  const SearchHandler = (e: { target: { value: string } }) => {
    const cleanData = () => {
      setGeoObject(undefined);
      setWeatherData(undefined);
    };
    if (e.target.value) {
      // Собираем URL и делаем запрос к Yandex
      fetchurl(API_URL_GEO_DATA, {
        apikey: API_KEY_YANDEX,
        format: 'json',
        geocode: e.target.value,
      }).then((resp) => {
        // Информацию о погоде тоже не всегда возвращают
        console.log('resp' + resp); // tslint:disable-line:no-console
        if (resp.response.GeoObjectCollection.featureMember.length) {
          const go =
            resp.response.GeoObjectCollection.featureMember[0].GeoObject;
          // Обрабатываем ответ Yandex
          setGeoObject(go);
          const pos = go.Point.pos.split(' ');

          // Собираем URL и делаем запрос к open-meteo
          fetchurl(API_URL_METEO_DATA, {
            hourly: 'pm10,pm2_5',
            latitude: pos[0],
            longitude: pos[1],
          }).then((resp1) => {
            if (!resp1.error) {
              resp1.hourly.map = resp1.hourly.time.reduce(
                reduceFunc,
                new Map()
              );
              setWeatherData(resp1);
            } else {
              cleanData();
            }
          });
        } else {
          cleanData();
        }
      });
    } else {
      cleanData();
    }
  };
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  return (
    <>
      <Menu />
      <AppFrame head1='Сервис данных погоды.' className='weatherInput'>
        <input
          type='text'
          placeholder='Название места'
          onChange={SearchHandler}
        />
        {geoObject ? ' Найдено: ' + geoObject.name : ''}
      </AppFrame>
      <AppFrame className='weatherData'>
        {weatherData ? (
          <table>
            {[...weatherData.hourly.map.keys()].map((d) => (
              <tbody>
                <tr>
                  <th>{d}</th>
                  {[...weatherData.hourly.map.get(d)!].map((i) => (
                    <th>
                      {new Date(weatherData.hourly.time[i]).toLocaleTimeString(
                        [],
                        { hour: '2-digit' }
                      )}
                    </th>
                  ))}
                </tr>
                <tr>
                  <th>pm 2,5</th>
                  {[...weatherData.hourly.map.get(d)!].map((i) => (
                    <td>{weatherData.hourly.pm2_5[i]}</td>
                  ))}
                </tr>
                <tr>
                  <th>pm 10</th>
                  {[...weatherData.hourly.map.get(d)!].map((i) => (
                    <td>{weatherData.hourly.pm10[i]}</td>
                  ))}
                </tr>
              </tbody>
            ))}
          </table>
        ) : (
          ''
        )}
      </AppFrame>
      <AppFrame className='weatherChart'>
        {weatherData ? (
          <Line
            data={{
              labels: weatherData.hourly.time.map((d) => {
                return new Date(d).toLocaleString([], {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                });
              }),
              datasets: [
                {
                  label: 'pm 2,5',
                  data: weatherData.hourly.pm2_5,
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                },
                {
                  label: 'pm 10',
                  data: weatherData.hourly.pm10,
                  borderColor: 'rgb(53, 162, 235)',
                  backgroundColor: 'rgba(53, 162, 235, 0.5)',
                },
              ],
            }}
          />
        ) : (
          ''
        )}
      </AppFrame>
    </>
  );
};
export default Weather;
