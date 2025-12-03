import LoginPage from '../pageObjects/LoginPage'
import ProductsPage from '../pageObjects/ProductsPage'
import CartPage from '../pageObjects/CartPage'
import CheckoutPage from '../pageObjects/CheckoutPage'

describe('E-commerce Edge Cases', () => {
  beforeEach(() => {
    LoginPage.visit()
    LoginPage.login('standard_user', 'secret_sauce')
  })

  it('Should add multiple items to cart', () => {
    // Add 3 different items
    ProductsPage.addSpecificItemToCart('sauce-labs-backpack')
    ProductsPage.addSpecificItemToCart('sauce-labs-bike-light')
    ProductsPage.addSpecificItemToCart('sauce-labs-bolt-t-shirt')

    // Verify cart badge shows 3
    ProductsPage.verifyCartBadge(3)

    // Go to cart and verify all items present
    ProductsPage.goToCart()
    CartPage.verifyCartItemCount(3)
  })

  it('Should handle checkout with missing form data', () => {
    // Add item and go to checkout
    ProductsPage.addFirstItemToCart()
    ProductsPage.goToCart()
    CartPage.clickCheckout()

    // Try to continue without filling form
    CheckoutPage.clickContinue()
    CheckoutPage.verifyErrorMessage()
  })

  it('Should handle empty cart checkout attempt', () => {
    ProductsPage.goToCart()
    CartPage.verifyPageLoaded()
    CartPage.verifyCartItemCount(0)

    // Checkout button should exist but cart is empty
    CartPage.elements.checkoutButton().should('be.visible')
  })

  it('Should allow removing all items from cart', () => {
    // Add multiple items
    ProductsPage.addMultipleItemsToCart(3)
    ProductsPage.goToCart()

    // Remove all items
    CartPage.removeAllItems()

    // Verify cart is empty
    CartPage.verifyCartItemCount(0)
  })

  it('Should handle continue shopping from cart', () => {
    ProductsPage.addFirstItemToCart()
    ProductsPage.goToCart()
    CartPage.clickContinueShopping()
    ProductsPage.verifyPageLoaded()
  })

  it('Should handle checkout cancellation', () => {
    ProductsPage.addFirstItemToCart()
    ProductsPage.goToCart()
    CartPage.clickCheckout()
    CheckoutPage.clickCancel()
    CartPage.verifyPageLoaded()
  })
})
