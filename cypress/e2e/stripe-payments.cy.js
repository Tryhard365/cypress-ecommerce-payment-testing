import LoginPage from '../pageObjects/LoginPage'
import ProductsPage from '../pageObjects/ProductsPage'
import CartPage from '../pageObjects/CartPage'
import CheckoutPage from '../pageObjects/CheckoutPage'

describe('Payment Flow Testing', () => {

  beforeEach(() => {
    // Login and navigate to checkout using POM
    LoginPage.visit()
    LoginPage.login('standard_user', 'secret_sauce')

    ProductsPage.addSpecificItemToCart('sauce-labs-backpack')
    ProductsPage.goToCart()

    CartPage.clickCheckout()
  })

  it('Should complete checkout with valid payment info', () => {
    CheckoutPage.enterShippingInfo('John', 'Doe', '12345')
    CheckoutPage.clickContinue()

    // Verify payment overview shows correct total
    CheckoutPage.verifyOrderSummary()

    // Complete payment
    CheckoutPage.clickFinish()

    // Verify success
    CheckoutPage.verifyOrderComplete()
  })

  it('Should validate required payment fields', () => {
    // Leave first name empty
    CheckoutPage.enterShippingInfo('', 'Doe', '12345')
    CheckoutPage.clickContinue()

    // Verify error for missing first name
    CheckoutPage.verifyErrorMessage()
  })

  it('Should validate postal code field', () => {
    // Fill name but leave postal code empty
    CheckoutPage.enterShippingInfo('John', 'Doe', '')
    CheckoutPage.clickContinue()

    // Verify error for missing postal code
    CheckoutPage.verifyErrorMessage()
  })

  it('Should allow reviewing order before payment', () => {
    CheckoutPage.enterShippingInfo('John', 'Doe', '12345')
    CheckoutPage.clickContinue()

    // Verify on overview page
    CheckoutPage.verifyOrderSummary()
  })

  it('Should handle payment cancellation', () => {
    CheckoutPage.enterShippingInfo('John', 'Doe', '12345')
    CheckoutPage.clickContinue()

    // Cancel payment
    CheckoutPage.clickCancel()

    // Verify back to inventory
    ProductsPage.verifyPageLoaded()
  })
})
