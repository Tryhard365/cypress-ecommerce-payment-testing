class LoginPage {
  elements = {
    usernameInput: () => cy.get('[data-test="username"]'),
    passwordInput: () => cy.get('[data-test="password"]'),
    loginButton: () => cy.get('[data-test="login-button"]'),
    errorMessage: () => cy.get('[data-test="error"]')
  }

  visit() {
    cy.visit('https://www.saucedemo.com/')
  }

  enterUsername(username) {
    this.elements.usernameInput().clear().type(username)
  }

  enterPassword(password) {
    this.elements.passwordInput().clear().type(password)
  }

  clickLogin() {
    this.elements.loginButton().click()
  }

  login(username, password) {
    this.enterUsername(username)
    this.enterPassword(password)
    this.clickLogin()
  }

  verifyErrorMessage() {
    this.elements.errorMessage().should('be.visible')
  }
}

export default new LoginPage()
