import { useContext } from 'react';
import { GeoObjectContext, WeatherDataContext } from './';
import {
  API_KEY_YANDEX,
  API_URL_GEO_DATA,
  API_URL_METEO_DATA,
  DEBOUNCER_TIMEOUT,
} from '../../const';

export const GeoObjectSearch = () => {
  // Контекст найденного географического объекта
  const [geoObject, setGeoObject] = useContext(GeoObjectContext);

  // Контекст данных сервиса погоды
  const [, setWeatherData] = useContext(WeatherDataContext);

  // Идентификатор таймера для задержки вывода
  let timer = setTimeout(() => {});

  // Очищает данные в контекстах
  const cleanData = () => {
    setGeoObject!(undefined);
    setWeatherData!(undefined);
  };

  // Собирает запрс из базового URL и словаря параметров,
  // выполняет его и преобразует результат в JSON
  const fetchurl = (u: string, s: any) => {
    const r = new URL(u);
    r.search = new URLSearchParams(s).toString();
    return fetch(r).then((resp) => resp.json());
  };

  // Собирает последовательности времен измерений на каждую дату
  const reduceFunc = (
    accum: Map<string, number[]>,
    value: string,
    index: number
  ) => {
    const d = new Date(value).toLocaleDateString();
    if (!accum.has(d)) {
      accum.set(d, []);
    }
    accum.get(d)!.push(index);
    return accum;
  };

  // Обрабатывает изменения строки поиска
  const SearchHandler = (e: { target: { value: string } }) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
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
            setGeoObject!(go);
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
                setWeatherData!(resp1);
              } else {
                // Данные о погоде не получены, очищаем
                cleanData();
              }
            });
          } else {
            // Географический объект не найден, очищаем
            cleanData();
          }
        });
      } else {
        // В поисковой строе ничего нет, очищаем
        cleanData();
      }
    }, DEBOUNCER_TIMEOUT);
  };
  return (
    <>
      <input
        type='text'
        placeholder='Название места'
        onChange={SearchHandler}
      />
      {geoObject ? ' Найдено: ' + geoObject.name : ''}
    </>
  );
};
