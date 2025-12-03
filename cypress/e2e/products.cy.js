import LoginPage from '../pageObjects/LoginPage'
import ProductsPage from '../pageObjects/ProductsPage'

describe('Product Tests', () => {
  beforeEach(() => {
    LoginPage.visit()
    LoginPage.login('standard_user', 'secret_sauce')
  })

  it('Should display product listing', () => {
    ProductsPage.verifyPageLoaded()
    ProductsPage.elements.inventoryItems().should('have.length.gt', 0)
  })

  it('Should view product details', () => {
    ProductsPage.openFirstProductDetails()
    cy.get('.inventory_details_name').should('be.visible')
    cy.get('.inventory_details_price').should('be.visible')
  })

  it('Should add product to cart from products page', () => {
    ProductsPage.addFirstItemToCart()
    ProductsPage.verifyCartBadge(1)
  })
})
