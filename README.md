# E-commerce & Payment Testing Automation

Automated end-to-end testing for e-commerce checkout flows and payment validation using Cypress.

## 🎯 What This Project Tests

- **Checkout Flows**: Complete purchase workflows, cart management
- **Payment Validation**: Form validation, required fields, error handling
- **Edge Cases**: Multiple items, empty cart, checkout cancellation
- **User Experience**: Continue shopping, order review, success confirmation

## 🛠️ Tech Stack

- **Cypress** - E2E testing framework
- **JavaScript** - Test scripting
- **GitHub Actions** - CI/CD automation
- **Chrome** - Test browser

## 📦 Test Coverage

### Checkout Flow Tests (3)
- ✅ Complete successful purchase
- ✅ Remove items from cart
- ✅ Empty cart validation

### Edge Case Tests (4)
- ✅ Multiple items in cart
- ✅ Missing form data validation
- ✅ Continue shopping flow
- ✅ Checkout cancellation

### Payment Flow Tests (5)
- ✅ Valid payment completion
- ✅ Required field validation (First Name, Last Name, Postal Code)
- ✅ Order review before payment
- ✅ Payment cancellation

**Total: 12 automated test cases**

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

Clone the repository

git clone https://github.com/tryhard365/cypress-ecommerce-payment-testing.git
Navigate to project directory

cd cypress-ecommerce-payment-testing
Install dependencies

npm install

text

### Running Tests

Open Cypress Test Runner (interactive mode)

npx cypress open
Run tests headlessly (CI mode)

npx cypress run

text

## 📊 CI/CD

Tests run automatically on every push via **GitHub Actions**.

View test results in the Actions tab.

## 🧪 Test Scenarios

All tests cover real-world e-commerce scenarios:
- Happy path flows
- Error handling
- Form validation
- User navigation
- Payment processing

## 📝 Test Site

Tests run against: [Sauce Demo](https://www.saucedemo.com/)

## 👤 Author

**Michael A.**  
QA Automation Engineer  
GitHub: [@tryhard365](https://github.com/tryhard365)

## 📄 License

MIT License