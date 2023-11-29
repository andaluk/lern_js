import { sIn, pMail, pName, pPass, sUp } from '../../src/const'
describe('Тестирование экрана входа', () => {
  const mail = 'test@test.com'
  const name = 'testname'
  const password = 'password'
  before(() => {
    // Очищаем коллекцию login-query
    cy.task('db:seed')
  })
  beforeEach(() => {
    cy.visit('/')
    cy.get('.menuBar').contains(sIn).click()
  })
  it('Вход несуществующим пользователем', () => {
    // login-query пустая
    cy.get(`input[placeholder=${pMail}]:visible`).type(mail)
    cy.get(`input[placeholder=${pPass}]:visible`).type(password)
    cy.get('button:visible').contains(sIn).click()
    // Пользователь не найден
    cy.get(':visible').should('contain', 'Ошибка авторизации')
  })
  it('Регистрация пользователя', () => {
    // переключаемся на форму регистрации
    cy.get('button:visible').contains(sUp).click()
    cy.get(`input[placeholder=${pName}]:visible`).type(name)
    cy.get(`input[placeholder=${pMail}]:visible`).first().type(mail)
    cy.get(`input[placeholder=${pPass}]:visible`)
      .first()
      .type(password)
      .next()
      .type(password)
    cy.get('button:visible').contains(sUp).click()
    // почта текущег пользователя отображается в меню
    cy.get('.menuBar').should('contain', mail)
  })
  it('Вход и выход пользователя', () => {
    // выполняем вход
    cy.get(`input[placeholder=${pMail}]:visible`).type(mail)
    cy.get(`input[placeholder=${pPass}]:visible`).type(password)
    cy.get('button:visible').contains(sIn).click()
    // почта текущег пользователя отображается в меню
    cy.get('.menuBar').should('contain', mail)
    // делаем выход
    // cypress не обрабатывает css события и не может обработать hover
    // по этому игнорируем проверку видимости.
    cy.get('.menuBar').contains('Выйти').click({ force: true })
    // почта текущего пользователя не должна отображаться в меню
    cy.get('.menuBar').should('not.contain', mail)
  })
})
