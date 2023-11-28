import { sIn, pMail, pName, pPass, sUp } from '../../src/const'
describe('Тестирование экрана входа', () => {
  const mail = 'test@test.com'
  const name = 'testname'
  const password = 'password'
  before(() => {
    cy.task('db:seed')
  })
  beforeEach(() => {
    cy.visit('/')
    cy.get('.menuBar').contains(sIn).click()
  })
  it('Вход несуществующим пользователем', () => {
    cy.get(`input[placeholder=${pMail}]:visible`).type(mail)
    cy.get(`input[placeholder=${pPass}]:visible`).type(password)
    cy.get('button:visible').contains(sIn).click()
    cy.get(':visible').should('contain', 'Ошибка авторизации')
  })
  it('Регистрация пользователя', () => {
    cy.get('button:visible').contains(sUp).click()
    cy.get(`input[placeholder=${pName}]:visible`).type(name)
    cy.get(`input[placeholder=${pMail}]:visible`).first().type(mail)
    cy.get(`input[placeholder=${pPass}]:visible`)
      .first()
      .type(password)
      .next()
      .type(password)
    cy.get('button:visible').contains(sUp).click()
    cy.get('.menuBar').trigger('mouseover').should('contain', mail)
  })
  it('Вход и выход пользователя', () => {
    cy.get(`input[placeholder=${pMail}]:visible`).type(mail)
    cy.get(`input[placeholder=${pPass}]:visible`).type(password)
    cy.get('button:visible').contains(sIn).click()
    cy.get('.menuBar').trigger('mouseover').should('contain', mail)
    cy.get('.menuBar').trigger('mouseover').contains('Выйти').click()
    cy.get('.menuBar').trigger('mouseover').should('not.contain', mail)
  })
})
