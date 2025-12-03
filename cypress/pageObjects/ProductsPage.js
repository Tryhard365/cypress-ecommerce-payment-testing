class ProductsPage {
  elements = {
    pageTitle: () => cy.get('.title'),
    inventoryItems: () => cy.get('.inventory_item'),
    itemNames: () => cy.get('.inventory_item_name'),
    addToCartButtons: () => cy.get('[data-test^="add-to-cart"]'),
    shoppingCartBadge: () => cy.get('.shopping_cart_badge'),
    shoppingCartLink: () => cy.get('.shopping_cart_link'),
    burgerMenu: () => cy.get('#react-burger-menu-btn'),
    logoutLink: () => cy.get('#logout_sidebar_link')
  }

  verifyPageLoaded() {
    this.elements.pageTitle().should('contain', 'Products')
  }

  openFirstProductDetails() {
    this.elements.itemNames().first().click()
  }

  addFirstItemToCart() {
    this.elements.addToCartButtons().first().click()
  }

  addMultipleItemsToCart(count) {
    for (let i = 0; i < count; i++) {
      this.elements.addToCartButtons().eq(i).click()
    }
  }

  addSpecificItemToCart(itemName) {
    cy.get(`[data-test="add-to-cart-${itemName}"]`).click()
  }

  verifyCartBadge(count) {
    this.elements.shoppingCartBadge().should('have.text', count.toString())
  }

  goToCart() {
    this.elements.shoppingCartLink().click()
  }

  logout() {
    this.elements.burgerMenu().click()
    this.elements.logoutLink().click()
  }
}

export default new ProductsPage()
