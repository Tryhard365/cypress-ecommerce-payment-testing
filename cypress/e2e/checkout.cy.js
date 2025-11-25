describe('E-commerce Checkout Flow', () => {
  
  beforeEach(() => {
    // Visit the demo site
    cy.visit('https://www.saucedemo.com/')
    
    // Login
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
  })


  it('Should complete a successful purchase', () => {
    // Add item to cart
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    
    // Go to cart
    cy.get('.shopping_cart_link').click()
    
    // Proceed to checkout
    cy.get('[data-test="checkout"]').click()
    
    // Fill checkout form
    cy.get('[data-test="firstName"]').type('John')
    cy.get('[data-test="lastName"]').type('Doe')
    cy.get('[data-test="postalCode"]').type('12345')
    cy.get('[data-test="continue"]').click()
    
    // Complete order
    cy.get('[data-test="finish"]').click()
    
    // Verify success
    cy.get('.complete-header').should('contain', 'Thank you for your order')
  })


  it('Should allow removing items from cart', () => {
    // Add item
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_link').click()
    
    // Remove item
    cy.get('[data-test="remove-sauce-labs-backpack"]').click()
    
    // Verify cart is empty
    cy.get('.cart_item').should('not.exist')
  })


  it('Should show empty cart message', () => {
    // Go to cart without adding items
    cy.get('.shopping_cart_link').click()
    
    // Verify cart is empty (no items)
    cy.get('.cart_item').should('not.exist')
    
    // Verify cart quantity badge is not shown
    cy.get('.shopping_cart_badge').should('not.exist')
  })

})  // ← Add this closing brace
