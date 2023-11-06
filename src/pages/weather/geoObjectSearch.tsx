import { DEBOUNCER_TIMEOUT } from '../../const';
import { useDispatch, useSelector } from 'react-redux';
import {
  geoObjectType,
  setGeoObject as setGeoObjectAction,
  clearGeoObject as clearGeoObjectAction,
  setWeatherData as setWeatherDataAction,
  clearWeatherData as clearWeatherDataAction,
  weatherDataType,
  setGeoSearch as setGeoSearchAction,
  geoSearchSelector,
} from '../../slices';
import { useGetWeatherDataQuery } from '../../services/getWeatherDataQuery';
import { useGetGeoObjectQuery } from '../../services/getGeoObjectQuery';

export const GeoObjectSearch = () => {
  // Получаем диспетчер хранилища
  const dispatch = useDispatch();

  // Получаем значение и функцию изменения поисковой строки в хранилище
  const geoSearch = useSelector(geoSearchSelector);
  const setGeoSearch = (data: string) => dispatch(setGeoSearchAction(data));

  // Получаем функции изменения и сброса
  // данных о географическом объекте
  const setGeoObject = (data: geoObjectType) =>
    dispatch(setGeoObjectAction(data));
  const clearGeoObject = () => dispatch(clearGeoObjectAction());

  // Получаем функции изменения и сброса данных
  // о загрязнении
  const setWeatherData = (data: weatherDataType) =>
    dispatch(setWeatherDataAction(data));
  const clearWeatherData = () => dispatch(clearWeatherDataAction());

  // Идентификатор таймера для задержки вывода
  let timer: ReturnType<typeof setTimeout> | undefined = undefined;

  // При изменении поисковой строки выполняем поиск
  // географического объекта
  const { data: geoObject } = useGetGeoObjectQuery(geoSearch);
  // если поисковая строка не пустая и запрос вернул результат,
  if (geoSearch && geoObject) {
    // сохраняем результат в хронилище
    setGeoObject(geoObject);
  } else {
    // иначе очищаем в хранилище старое значение результата
    clearGeoObject();
  }

  // При изменении географического объекта выполняем
  // запрос данных по загрязнениям
  const { data: weatherData } = useGetWeatherDataQuery(geoObject);
  // если поисковая строка не пустая и запрос вернул результат,
  if (geoSearch && weatherData) {
    // сохраняем результат в хронилище
    setWeatherData(weatherData);
  } else {
    // иначе очищаем в хранилище старое значение результата
    clearWeatherData();
  }

  // Обрабатывает изменения строки поиска
  const SearchHandler = (e: { target: { value: string } }) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setGeoSearch(e.target.value);
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
