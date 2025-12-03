import LoginPage from '../pageObjects/LoginPage'
import ProductsPage from '../pageObjects/ProductsPage'
import CartPage from '../pageObjects/CartPage'
import CheckoutPage from '../pageObjects/CheckoutPage'

describe('Payment Validation Tests', () => {
  beforeEach(() => {
    LoginPage.visit()
    LoginPage.login('standard_user', 'secret_sauce')
    ProductsPage.addFirstItemToCart()
    ProductsPage.goToCart()
    CartPage.clickCheckout()
  })

  it('Should show order review before payment', () => {
    CheckoutPage.enterShippingInfo('John', 'Doe', '12345')
    CheckoutPage.clickContinue()
    CheckoutPage.verifyOrderSummary()
  })

  it('Should allow payment cancellation from review', () => {
    CheckoutPage.enterShippingInfo('John', 'Doe', '12345')
    CheckoutPage.clickContinue()
    CheckoutPage.verifyOrderSummary()

    CheckoutPage.clickCancel()

    // You are back on Products page, not Cart
    ProductsPage.verifyPageLoaded()
  })

  it('Should complete payment after review', () => {
    CheckoutPage.enterShippingInfo('John', 'Doe', '12345')
    CheckoutPage.clickContinue()
    CheckoutPage.verifyOrderSummary()
    CheckoutPage.clickFinish()
    CheckoutPage.verifyOrderComplete()
  })
})
