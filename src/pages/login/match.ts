import { nameRegExp, mailRegExp } from '../../const'

// Функция валидации имени
export const nameMatch = (n: string): boolean => nameRegExp.test(n)

// Функция валидации почты
export const mailMatch = (n: string): boolean => mailRegExp.test(n)
