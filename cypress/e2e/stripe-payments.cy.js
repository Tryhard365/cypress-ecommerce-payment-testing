describe('Payment Flow Testing', () => {
  
  // Using Sauce Demo's checkout as payment flow testing
  // We'll simulate payment scenarios with form validation
  
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    
    // Add item and proceed to checkout
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()
  })

  it('Should complete checkout with valid payment info', () => {
    // Fill all required fields (simulating payment form)
    cy.get('[data-test="firstName"]').type('John')
    cy.get('[data-test="lastName"]').type('Doe')
    cy.get('[data-test="postalCode"]').type('12345')
    cy.get('[data-test="continue"]').click()
    
    // Verify payment overview shows correct total
    cy.get('.summary_total_label').should('be.visible')
    
    // Complete payment
    cy.get('[data-test="finish"]').click()
    
    // Verify success
    cy.get('.complete-header').should('contain', 'Thank you')
  })

  it('Should validate required payment fields', () => {
    // Leave first name empty
    cy.get('[data-test="lastName"]').type('Doe')
    cy.get('[data-test="postalCode"]').type('12345')
    cy.get('[data-test="continue"]').click()
    
    // Verify error for missing first name
    cy.get('[data-test="error"]').should('contain', 'First Name is required')
  })

  it('Should validate postal code field', () => {
    // Fill name but leave postal code empty
    cy.get('[data-test="firstName"]').type('John')
    cy.get('[data-test="lastName"]').type('Doe')
    cy.get('[data-test="continue"]').click()
    
    // Verify error for missing postal code
    cy.get('[data-test="error"]').should('contain', 'Postal Code is required')
  })

  it('Should allow reviewing order before payment', () => {
    // Complete checkout form
    cy.get('[data-test="firstName"]').type('John')
    cy.get('[data-test="lastName"]').type('Doe')
    cy.get('[data-test="postalCode"]').type('12345')
    cy.get('[data-test="continue"]').click()
    
    // Verify on overview page
    cy.url().should('include', 'checkout-step-two')
    
    // Verify item details visible
    cy.get('.cart_item').should('be.visible')
    cy.get('.summary_subtotal_label').should('be.visible')
    cy.get('.summary_tax_label').should('be.visible')
    cy.get('.summary_total_label').should('be.visible')
  })

  it('Should handle payment cancellation', () => {
    // Fill form and go to overview
    cy.get('[data-test="firstName"]').type('John')
    cy.get('[data-test="lastName"]').type('Doe')
    cy.get('[data-test="postalCode"]').type('12345')
    cy.get('[data-test="continue"]').click()
    
    // Cancel payment
    cy.get('[data-test="cancel"]').click()
    
    // Verify back to inventory
    cy.url().should('include', '/inventory.html')
  })

})
