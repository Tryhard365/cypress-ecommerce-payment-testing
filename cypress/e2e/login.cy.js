import LoginPage from '../pageObjects/LoginPage'
import ProductsPage from '../pageObjects/ProductsPage'

describe('Login Tests', () => {
  beforeEach(() => {
    LoginPage.visit()
  })

  it('Should login successfully with valid credentials', () => {
    LoginPage.login('standard_user', 'secret_sauce')
    ProductsPage.verifyPageLoaded()
  })

  it('Should show error with invalid credentials', () => {
    LoginPage.login('invalid_user', 'wrong_password')
    LoginPage.verifyErrorMessage()
  })

  it('Should show error for locked out user', () => {
    LoginPage.login('locked_out_user', 'secret_sauce')
    LoginPage.verifyErrorMessage()
  })

  it('Should logout successfully', () => {
    LoginPage.login('standard_user', 'secret_sauce')
    ProductsPage.verifyPageLoaded()
    ProductsPage.logout()
    cy.url().should('include', 'saucedemo.com')
    cy.url().should('not.include', 'inventory')
  })
})
