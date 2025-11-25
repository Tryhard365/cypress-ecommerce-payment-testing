describe('E-commerce Edge Cases', () => {
  
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
  })

  it('Should add multiple items to cart', () => {
    // Add 3 different items
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
    
    // Verify cart badge shows 3
    cy.get('.shopping_cart_badge').should('contain', '3')
    
    // Go to cart and verify all items present
    cy.get('.shopping_cart_link').click()
    cy.get('.cart_item').should('have.length', 3)
  })

  it('Should handle checkout with missing form data', () => {
    // Add item and go to checkout
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()
    
    // Try to continue without filling form
    cy.get('[data-test="continue"]').click()
    
    // Verify error message appears
    cy.get('[data-test="error"]').should('be.visible')
    cy.get('[data-test="error"]').should('contain', 'First Name is required')
  })

  it('Should allow continuing shopping from cart', () => {
    // Add item and go to cart
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_link').click()
    
    // Click continue shopping
    cy.get('[data-test="continue-shopping"]').click()
    
    // Verify back on products page
    cy.url().should('include', '/inventory.html')
  })

  it('Should cancel checkout and return to cart', () => {
    // Add item, go to cart, start checkout
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()
    
    // Fill form
    cy.get('[data-test="firstName"]').type('John')
    cy.get('[data-test="lastName"]').type('Doe')
    cy.get('[data-test="postalCode"]').type('12345')
    cy.get('[data-test="continue"]').click()
    
    // Cancel on overview page
    cy.get('[data-test="cancel"]').click()
    
    // Verify back on products page
    cy.url().should('include', '/inventory.html')
  })

})
