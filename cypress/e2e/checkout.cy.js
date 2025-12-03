import LoginPage from '../pageObjects/LoginPage'
import ProductsPage from '../pageObjects/ProductsPage'
import CartPage from '../pageObjects/CartPage'
import CheckoutPage from '../pageObjects/CheckoutPage'

describe('Checkout Flow Tests', () => {
  beforeEach(() => {
    LoginPage.visit()
    LoginPage.login('standard_user', 'secret_sauce')
  })

  it('Should complete successful purchase', () => {
    ProductsPage.addFirstItemToCart()
    ProductsPage.goToCart()
    CartPage.clickCheckout()
    
    CheckoutPage.enterShippingInfo('John', 'Doe', '12345')
    CheckoutPage.clickContinue()
    CheckoutPage.verifyOrderSummary()
    CheckoutPage.clickFinish()
    CheckoutPage.verifyOrderComplete()
  })

  it('Should validate missing first name', () => {
    ProductsPage.addFirstItemToCart()
    ProductsPage.goToCart()
    CartPage.clickCheckout()
    
    CheckoutPage.enterShippingInfo('', 'Doe', '12345')
    CheckoutPage.clickContinue()
    CheckoutPage.verifyErrorMessage()
  })

  it('Should validate missing last name', () => {
    ProductsPage.addFirstItemToCart()
    ProductsPage.goToCart()
    CartPage.clickCheckout()
    
    CheckoutPage.enterShippingInfo('John', '', '12345')
    CheckoutPage.clickContinue()
    CheckoutPage.verifyErrorMessage()
  })

  it('Should validate missing postal code', () => {
    ProductsPage.addFirstItemToCart()
    ProductsPage.goToCart()
    CartPage.clickCheckout()
    
    CheckoutPage.enterShippingInfo('John', 'Doe', '')
    CheckoutPage.clickContinue()
    CheckoutPage.verifyErrorMessage()
  })

  it('Should checkout with multiple items', () => {
    ProductsPage.addMultipleItemsToCart(3)
    ProductsPage.goToCart()
    CartPage.verifyCartItemCount(3)
    CartPage.clickCheckout()
    
    CheckoutPage.enterShippingInfo('Jane', 'Smith', '54321')
    CheckoutPage.clickContinue()
    CheckoutPage.clickFinish()
    CheckoutPage.verifyOrderComplete()
  })
})
