/*
/ Задаются основные константы и текстовые литералы
*/

// надпись на кнопке входа
export const sIn = "Вход";

// надпись на кнопке регистрации
export const sUp = "Регистрация";

// название класса для кнопок переключения
// с входа на регистрацию и обратно
export const ghClass = "ghost";

// placeholder для ввода имени
export const pName = "Имя";

// placeholder для ввода почты
export const pMail = "Почта";

// placeholder для ввода пароля
export const pPass = "Пароль";

// Сообщения об ошибках при валидации форм
export const errMsg = [
  "",
  "Введите имя.",
  "В имени должны быть только английские буквы и цифры",
  "Введите почту.",
  "Не правильный формат почты.",
  "Введите пароль.",
  "Повторите пароль.",
  "Пароли не совпадают.",
];

// Функция валидации имени
export const nameRegExp = (n: string): boolean => /^[a-z0-9]+$/i.test(n);

// Функция валидации почты
export const mailRegExp = (m: string): boolean =>
  /^[a-z][a-z0-9._-]*@(?:[a-z0-9_-]+\.)*[a-z]{2,6}$/i.test(m);

export const API_KEY_YANDEX = "85eaff1b-ef9e-4c11-89bc-ca01d1ae43de";
export const API_URL_GEO_DATA = "https://geocode-maps.yandex.ru/1.x/";
export const API_URL_METEO_DATA =
  "https://air-quality-api.open-meteo.com/v1/air-quality";
