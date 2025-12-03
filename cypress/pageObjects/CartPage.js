class CartPage {
  elements = {
    pageTitle: () => cy.get('.title'),
    cartItems: () => cy.get('.cart_item'),
    removeButtons: () => cy.get('[data-test^="remove"]'),
    checkoutButton: () => cy.get('[data-test="checkout"]'),
    continueShoppingButton: () => cy.get('[data-test="continue-shopping"]'),
    cartQuantity: () => cy.get('.cart_quantity')
  }

  verifyPageLoaded() {
    this.elements.pageTitle().should('have.text', 'Your Cart')
  }

  verifyCartItemCount(count) {
    if (count === 0) {
      this.elements.cartItems().should('not.exist')
    } else {
      this.elements.cartItems().should('have.length', count)
    }
  }

  removeFirstItem() {
    this.elements.removeButtons().first().click()
  }

  removeAllItems() {
    this.elements.removeButtons().each(($btn) => {
      cy.wrap($btn).click()
    })
  }

  clickCheckout() {
    this.elements.checkoutButton().click()
  }

  clickContinueShopping() {
    this.elements.continueShoppingButton().click()
  }
}

export default new CartPage()
