/*
/ Задаются основные константы и текстовые литералы
*/

// Название приложения
export const APP_TITLE = 'Информация о городе'

// надпись на кнопке входа
export const sIn = 'Вход'

// надпись на кнопке регистрации
export const sUp = 'Регистрация'

// название класса для кнопок переключения
// с входа на регистрацию и обратно
export const ghClass = 'ghost'

// placeholder для ввода имени
export const pName = 'Имя'

// placeholder для ввода почты
export const pMail = 'Почта'

// placeholder для ввода пароля
export const pPass = 'Пароль'

// Сообщения об ошибках при валидации форм
export const errMsg = [
  '',
  'Введите имя.',
  'В имени должны быть только английские буквы и цифры',
  'Введите почту.',
  'Не правильный формат почты.',
  'Введите пароль.',
  'Повторите пароль.',
  'Пароли не совпадают.',
]

// регулярное выражение для валидации имени
export const nameRegExp = /^[a-z0-9]+$/i

// регулярное выражение для валидации почты
export const mailRegExp = /^[a-z][a-z0-9._-]*@(?:[a-z0-9_-]+\.)*[a-z]{2,6}$/i

//Поиск географического объекта требуес ключ регистрации
//export const API_KEY_YANDEX = '85eaff1b-ef9e-4c11-89bc-ca01d1ae43de';
export const API_KEY_YANDEX = 'a4c3ffbe-d2b8-4b26-9fe7-8cff10ed12e5'

// Адрес запроса на поиск географического объекта
export const API_URL_GEO_DATA = 'https://geocode-maps.yandex.ru/1.x/'

// Адрес запроса данных о загрязнении
export const API_URL_METEO_DATA =
  'https://air-quality-api.open-meteo.com/v1/air-quality'

// Поиск данных географического объекта происходит если за это
// время поисковая строка не менялась
export const DEBOUNCER_TIMEOUT = 500

// Порт, на котором работает бэкенд
export const BACKEND_PORT = 3001

// Адрес, на котором слушает express
export const BACKEND_URL = `http://localhost:${BACKEND_PORT}`

// Строка соединения с mongodb
export const MONGO_URL = 'mongodb://127.0.0.1/my_database'

// Название mongo коллекции для замиси истории географических объектов
export const GEOOBJECT_MONGO_COLLECTION = 'history-query'

// Название mongo коллекции для замиси информации о пользователях
export const LOGIN_MONGO_COLLECTION = 'login-query'
