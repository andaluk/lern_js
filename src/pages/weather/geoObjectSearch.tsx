import { DEBOUNCER_TIMEOUT } from '../../const'
import { useDispatch, useSelector } from 'react-redux'
import {
  geoObjectType,
  setGeoObject as setGeoObjectAction,
  clearGeoObject as clearGeoObjectAction,
  setWeatherData as setWeatherDataAction,
  clearWeatherData as clearWeatherDataAction,
  weatherDataType,
  setGeoSearch as setGeoSearchAction,
  geoSearchSelector,
} from '../../slices'
import { useGetWeatherDataQuery } from '../../services/getWeatherDataQuery'
import { useGetGeoObjectQuery } from '../../services/getGeoObjectQuery'
import { useLazyPostGeoObjectQuery } from '../../services/postGeoObjectQuery'
import { useEffect } from 'react'

export const GeoObjectSearch = () => {
  // Получаем диспетчер хранилища
  const dispatch = useDispatch()

  // Получаем значение и функцию изменения поисковой строки в хранилище
  const geoSearch = useSelector(geoSearchSelector)
  const setGeoSearch = (data: string) => dispatch(setGeoSearchAction(data))

  // Получаем функции изменения и сброса
  // данных о географическом объекте
  const setGeoObject = (data: geoObjectType) =>
    dispatch(setGeoObjectAction(data))
  const clearGeoObject = () => dispatch(clearGeoObjectAction())

  // Получаем функции изменения и сброса данных
  // о загрязнении
  const setWeatherData = (data: weatherDataType) =>
    dispatch(setWeatherDataAction(data))
  const clearWeatherData = () => dispatch(clearWeatherDataAction())

  // Идентификатор таймера для задержки вывода
  let timer: ReturnType<typeof setTimeout> | undefined = undefined

  // При изменении поисковой строки выполняем поиск
  // географического объекта
  const { data: geoObject } = useGetGeoObjectQuery(geoSearch)
  // если поисковая строка не пустая и запрос вернул результат,
  if (geoSearch && geoObject) {
    // сохраняем результат в хронилище
    setGeoObject(geoObject)
  } else {
    // иначе очищаем в хранилище старое значение результата
    clearGeoObject()
  }

  // Получаем функцию запроса и соответствующие константы
  const [
    postGeoObjectQuery,
    { isError: isPostGeoObjectQueryError, error: postGeoObjectQueryError },
  ] = useLazyPostGeoObjectQuery()

  // При изменении географического объекта выполняем
  // запрос данных по загрязнениям
  const { data: weatherData } = useGetWeatherDataQuery(geoObject)
  // если поисковая строка не пустая и запрос вернул результат,
  if (geoSearch && weatherData) {
    // сохраняем результат в хронилище
    setWeatherData(weatherData)
  } else {
    // иначе очищаем в хранилище старое значение результата
    clearWeatherData()
  }

  // Сохраняем в базу данных всю полученную информацию
  useEffect(() => {
    postGeoObjectQuery({ geoObject, weatherData })
      .then(({ data }) => console.log('Даееые записаны.', data))
      .catch((reson) => console.error('Ошибка записи данных.', reson))
    // По сути, нас итересует только когда все данные изменились полностью
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weatherData])

  // Произошла ошибка при сохранении
  if (isPostGeoObjectQueryError)
    console.error('postGeoObjectQueryError: ', postGeoObjectQueryError)

  // Обрабатывает изменения строки поиска
  const SearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Без этого последующий запрос блокируется (в Firefox)
    e.preventDefault()
    clearTimeout(timer)
    timer = setTimeout(() => {
      setGeoSearch(e.target.value)
    }, DEBOUNCER_TIMEOUT)
  }

  return (
    <>
      <input
        type='text'
        placeholder='Название места'
        onChange={SearchHandler}
      />
      {geoObject ? ' Найдено: ' + geoObject.name : ''}
    </>
  )
}
