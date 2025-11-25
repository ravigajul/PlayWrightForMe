import { test, expect } from '@playwright/test';

test.describe('Shopping Cart - Happy Path', () => {
  test('should complete full checkout process successfully', async ({ page }) => {
    // Navigate to the website
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Verify homepage loaded
    await expect(page).toHaveTitle(/Practice Software Testing - Toolshop/);
    
    // Click on a product (Combination Pliers)
    await page.getByTestId('product-01JZV5MZFXT8ADWAMNFK2J97MT').click();
    
    // Verify product page loaded
    await expect(page.locator('h1')).toContainText('Combination Pliers');
    await expect(page.getByTestId('unit-price')).toContainText('14.15');
    
    // Add product to cart
    await page.getByTestId('add-to-cart').click();
    
    // Verify product added to cart (alert message)
    await expect(page.locator('[role="alert"]')).toContainText('Product added to shopping cart');
    
    // Verify cart icon shows 1 item
    await expect(page.getByTestId('nav-cart')).toContainText('1');
    
    // Go to cart
    await page.getByTestId('nav-cart').click();
    
    // Verify cart page
    await expect(page).toHaveURL(/.*checkout/);
    await expect(page.locator('table')).toContainText('Combination Pliers');
    await expect(page.locator('table')).toContainText('$14.15');
    
    // Proceed to checkout (step 1)
    await page.getByTestId('proceed-1').click();
    
    // Login step (step 2)
    await expect(page.locator('h3')).toContainText('Login');
    
    // Fill in login credentials
    await page.getByTestId('email').fill('customer@practicesoftwaretesting.com');
    await page.getByTestId('password').fill('welcome01');
    await page.getByTestId('login-submit').click();
    
    // Verify login successful
    await expect(page.locator('text=Hello Jane Doe')).toBeVisible();
    await expect(page.getByText('Jane Doe')).toBeVisible(); // Check navigation
    
    // Proceed to address step (step 3)
    await page.getByTestId('proceed-2').click();
    
    // Billing Address step (step 3)
    await expect(page.locator('h3')).toContainText('Billing Address');
    
    // Verify some fields are pre-populated
    await expect(page.getByTestId('address')).toHaveValue('Test street 98');
    await expect(page.getByTestId('city')).toHaveValue('Vienna');
    await expect(page.getByTestId('country')).toHaveValue('Austria');
    
    // Fill in required fields
    await page.getByTestId('state').fill('Vienna State');
    await page.getByTestId('postal_code').fill('1010');
    
    // Proceed to payment step (step 4)
    await page.getByTestId('proceed-3').click();
    
    // Payment step (step 4)
    await expect(page.locator('h3')).toContainText('Payment');
    
    // Select credit card payment method
    await page.getByTestId('payment-method').selectOption('Credit Card');
    
    // Fill in credit card details
    await page.getByTestId('credit_card_number').fill('1234-5678-9012-3456');
    await page.getByTestId('expiration_date').fill('12/2028');
    await page.getByTestId('cvv').fill('123');
    await page.getByTestId('card_holder_name').fill('Jane Doe');
    
    // Complete the purchase
    await page.getByTestId('finish').click();
    
    // Verify payment successful
    await expect(page.locator('text=Payment was successful')).toBeVisible();
    
    console.log('✅ Happy path test completed successfully!');
  });

  test('should handle cart quantity updates', async ({ page }) => {
    // Navigate to the website
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Click on a product
    await page.getByTestId('product-01JZV5MZFXT8ADWAMNFK2J97MT').click();
    
    // Increase quantity to 2
    await page.getByTestId('increase-quantity').click();
    await expect(page.getByTestId('quantity')).toHaveValue('2');
    
    // Add to cart
    await page.getByTestId('add-to-cart').click();
    
    // Go to cart
    await page.getByTestId('nav-cart').click();
    
    // Verify quantity is 2 and total is calculated correctly
    await expect(page.locator('[data-test="quantity-01JZV5MZFXT8ADWAMNFK2J97MT"]')).toHaveValue('2');
    await expect(page.locator('table')).toContainText('$28.30'); // 2 * $14.15
    
    console.log('✅ Quantity update test completed successfully!');
  });

  test('should display out of stock items correctly', async ({ page }) => {
    // Navigate to the website
    await page.goto('https://practicesoftwaretesting.com/');
    
    // Find and verify out of stock product (Long Nose Pliers)
    const outOfStockProduct = page.getByTestId('product-01JZV5MZG889QNV31S91BHD8AJ');
    await expect(outOfStockProduct).toContainText('Out of stock');
    
    // Click on out of stock product
    await outOfStockProduct.click();
    
    // Verify add to cart button is disabled or not present
    await expect(page.getByTestId('add-to-cart')).toBeDisabled();
    
    console.log('✅ Out of stock handling test completed successfully!');
  });
});
