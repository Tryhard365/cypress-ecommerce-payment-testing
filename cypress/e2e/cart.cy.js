import LoginPage from '../pageObjects/LoginPage'
import ProductsPage from '../pageObjects/ProductsPage'
import CartPage from '../pageObjects/CartPage'

describe('Cart Tests', () => {
  beforeEach(() => {
    LoginPage.visit()
    LoginPage.login('standard_user', 'secret_sauce')
  })

  it('Should add single item to cart', () => {
    ProductsPage.addFirstItemToCart()
    ProductsPage.verifyCartBadge(1)
    ProductsPage.goToCart()
    CartPage.verifyCartItemCount(1)
  })

  it('Should add multiple items to cart', () => {
    ProductsPage.addMultipleItemsToCart(3)
    ProductsPage.verifyCartBadge(3)
    ProductsPage.goToCart()
    CartPage.verifyCartItemCount(3)
  })

  it('Should remove item from cart', () => {
    ProductsPage.addMultipleItemsToCart(2)
    ProductsPage.goToCart()
    CartPage.removeFirstItem()
    CartPage.verifyCartItemCount(1)
  })

  it('Should handle empty cart', () => {
    ProductsPage.goToCart()
    CartPage.verifyCartItemCount(0)
  })
})
