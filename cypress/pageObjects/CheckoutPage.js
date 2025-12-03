class CheckoutPage {
  elements = {
    pageTitle: () => cy.get('.title'),
    firstNameInput: () => cy.get('[data-test="firstName"]'),
    lastNameInput: () => cy.get('[data-test="lastName"]'),
    postalCodeInput: () => cy.get('[data-test="postalCode"]'),
    continueButton: () => cy.get('[data-test="continue"]'),
    finishButton: () => cy.get('[data-test="finish"]'),
    cancelButton: () => cy.get('[data-test="cancel"]'),
    errorMessage: () => cy.get('[data-test="error"]'),
    completeHeader: () => cy.get('.complete-header'),
    summaryInfo: () => cy.get('.summary_info'),
    summaryTotal: () => cy.get('.summary_total_label')
  }

  verifyCheckoutPageLoaded() {
    this.elements.pageTitle().should('contain', 'Checkout: Your Information')
  }

  enterShippingInfo(firstName, lastName, postalCode) {
    if (firstName) this.elements.firstNameInput().type(firstName)
    if (lastName) this.elements.lastNameInput().type(lastName)
    if (postalCode) this.elements.postalCodeInput().type(postalCode)
  }

  clickContinue() {
    this.elements.continueButton().click()
  }

  clickFinish() {
    this.elements.finishButton().click()
  }

  clickCancel() {
    this.elements.cancelButton().click()
  }

  verifyErrorMessage() {
    this.elements.errorMessage().should('be.visible')
  }

  verifyOrderComplete() {
    this.elements.completeHeader().should('contain', 'Thank you for your order')
  }

  verifyOrderSummary() {
    this.elements.summaryInfo().should('be.visible')
    this.elements.summaryTotal().should('be.visible')
  }
}

export default new CheckoutPage()
