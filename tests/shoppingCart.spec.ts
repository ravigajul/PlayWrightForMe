import { test, expect } from '@playwright/test';

test.describe('Shopping Cart Functionality', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the homepage before each test
    await page.goto('https://practicesoftwaretesting.com/');
  });

  test('should add a single item to cart and verify cart details', async ({ page }) => {
    // Click on the first product (Combination Pliers)
    await page.locator('[data-test="product-01JZV5MZFXT8ADWAMNFK2J97MT"]').click();
    
    // Verify we're on the product details page
    await expect(page).toHaveTitle(/Combination Pliers/);
    await expect(page.locator('h1')).toContainText('Combination Pliers');
    
    // Verify product price is displayed
    await expect(page.locator('[data-test="unit-price"]')).toContainText('14.15');
    
    // Add product to cart
    await page.locator('[data-test="add-to-cart"]').click();
    
    // Verify success message appears
    await expect(page.locator('.alert')).toContainText('Product added to shopping cart');
    
    // Open navigation menu and verify cart count
    await page.getByRole('button', { name: 'Toggle navigation' }).click();
    await expect(page.locator('[data-test="nav-cart"] .cart-count')).toContainText('1');
    
    // Navigate to cart/checkout page
    await page.locator('[data-test="nav-cart"]').click();
    
    // Verify we're on checkout page
    await expect(page).toHaveTitle(/Checkout/);
    
    // Verify cart contains the correct product
    await expect(page.locator('[data-test="cart-item"]')).toContainText('Combination Pliers');
    await expect(page.locator('[data-test="cart-quantity"]')).toHaveValue('1');
    await expect(page.locator('[data-test="cart-total"]')).toContainText('$14.15');
  });

  test('should update quantity of items in cart', async ({ page }) => {
    // Add first product to cart
    await page.locator('[data-test="product-01JZV5MZFXT8ADWAMNFK2J97MT"]').click();
    await page.locator('[data-test="add-to-cart"]').click();
    
    // Go to cart
    await page.getByRole('button', { name: 'Toggle navigation' }).click();
    await page.locator('[data-test="nav-cart"]').click();
    
    // Get initial quantity and price
    const quantityInput = page.locator('[data-test="cart-quantity"]');
    await expect(quantityInput).toHaveValue('1');
    
    // Increase quantity to 3
    await quantityInput.fill('3');
    
    // Verify total is updated (should be 3 × $14.15 = $42.45)
    await expect(page.locator('[data-test="cart-total"]')).toContainText('$42.45');
    
    // Decrease quantity back to 2
    await quantityInput.fill('2');
    
    // Verify total is updated (should be 2 × $14.15 = $28.30)
    await expect(page.locator('[data-test="cart-total"]')).toContainText('$28.30');
  });

  test('should add multiple different products to cart', async ({ page }) => {
    // Add first product (Combination Pliers)
    await page.locator('[data-test="product-01JZV5MZFXT8ADWAMNFK2J97MT"]').click();
    await page.locator('[data-test="add-to-cart"]').click();
    await page.goBack();
    
    // Add second product (Pliers)
    await page.locator('[data-test="product-01JZV5MZG1ZFBWAP32CVYV6XMF"]').click();
    await page.locator('[data-test="add-to-cart"]').click();
    await page.goBack();
    
    // Check cart has 2 items
    await page.getByRole('button', { name: 'Toggle navigation' }).click();
    await expect(page.locator('[data-test="nav-cart"] .cart-count')).toContainText('2');
    
    // Go to cart and verify both products
    await page.locator('[data-test="nav-cart"]').click();
    
    // Verify both products are in cart
    const cartItems = page.locator('[data-test="cart-item"]');
    await expect(cartItems).toHaveCount(2);
    
    // Verify individual prices and total
    await expect(page.locator('.cart-item:has-text("Combination Pliers") [data-test="item-price"]')).toContainText('$14.15');
    await expect(page.locator('.cart-item:has-text("Pliers") [data-test="item-price"]')).toContainText('$12.01');
    
    // Total should be $14.15 + $12.01 = $26.16
    await expect(page.locator('[data-test="cart-total"]')).toContainText('$26.16');
  });

  test('should remove item from cart', async ({ page }) => {
    // Add product to cart
    await page.locator('[data-test="product-01JZV5MZFXT8ADWAMNFK2J97MT"]').click();
    await page.locator('[data-test="add-to-cart"]').click();
    
    // Go to cart
    await page.getByRole('button', { name: 'Toggle navigation' }).click();
    await page.locator('[data-test="nav-cart"]').click();
    
    // Verify item is in cart
    await expect(page.locator('[data-test="cart-item"]')).toContainText('Combination Pliers');
    
    // Remove item from cart
    await page.locator('[data-test="remove-from-cart"]').click();
    
    // Verify cart is empty
    await expect(page.locator('[data-test="empty-cart-message"]')).toBeVisible();
    await expect(page.locator('[data-test="cart-item"]')).toHaveCount(0);
    
    // Verify cart count in navigation is updated
    await expect(page.locator('[data-test="nav-cart"] .cart-count')).toContainText('0');
  });

  test('should handle out-of-stock products', async ({ page }) => {
    // Try to add out-of-stock product (Long Nose Pliers)
    await page.locator('[data-test="product-01JZV5MZG889QNV31S91BHD8AJ"]').click();
    
    // Verify product is marked as out of stock
    await expect(page.locator('.out-of-stock')).toContainText('Out of stock');
    
    // Verify add to cart button is disabled or not present
    const addToCartButton = page.locator('[data-test="add-to-cart"]');
    await expect(addToCartButton).toBeDisabled();
  });

  test('should proceed to checkout from cart', async ({ page }) => {
    // Add product to cart
    await page.locator('[data-test="product-01JZV5MZFXT8ADWAMNFK2J97MT"]').click();
    await page.locator('[data-test="add-to-cart"]').click();
    
    // Go to cart
    await page.getByRole('button', { name: 'Toggle navigation' }).click();
    await page.locator('[data-test="nav-cart"]').click();
    
    // Click proceed to checkout
    await page.locator('[data-test="proceed-to-checkout"]').click();
    
    // Verify we're taken to the sign-in step
    await expect(page.locator('.checkout-step.active')).toContainText('Sign in');
    
    // Verify checkout progress steps are visible
    await expect(page.locator('.checkout-steps')).toContainText('Cart');
    await expect(page.locator('.checkout-steps')).toContainText('Sign in');
    await expect(page.locator('.checkout-steps')).toContainText('Billing Address');
    await expect(page.locator('.checkout-steps')).toContainText('Payment');
  });

  test('should search and filter products before adding to cart', async ({ page }) => {
    // Open filters
    await page.getByRole('button', { name: 'Filters' }).click();
    
    // Search for "hammer"
    await page.locator('[data-test="search-query"]').fill('hammer');
    await page.locator('[data-test="search-submit"]').click();
    
    // Verify search results
    await expect(page.locator('h3')).toContainText('Searched for: hammer');
    
    // Verify only hammer products are shown
    const products = page.locator('[data-test^="product-"]');
    await expect(products.first()).toContainText('hammer', { ignoreCase: true });
    
    // Add a hammer to cart
    await products.first().click();
    await page.locator('[data-test="add-to-cart"]').click();
    
    // Verify cart count
    await page.getByRole('button', { name: 'Toggle navigation' }).click();
    await expect(page.locator('[data-test="nav-cart"] .cart-count')).toContainText('1');
  });

  test('should handle price range filtering', async ({ page }) => {
    // Open filters
    await page.getByRole('button', { name: 'Filters' }).click();
    
    // Adjust price range slider to show only cheaper items (e.g., under $15)
    const maxSlider = page.locator('[data-test="price-range-max"]');
    await maxSlider.click();
    
    // Verify products shown are within price range
    const productPrices = page.locator('[data-test="product-price"]');
    const priceTexts = await productPrices.allTextContents();
    
    for (const priceText of priceTexts) {
      const price = parseFloat(priceText.replace('$', ''));
      expect(price).toBeLessThanOrEqual(15);
    }
  });

  test('should sort products by price', async ({ page }) => {
    // Open filters
    await page.getByRole('button', { name: 'Filters' }).click();
    
    // Sort by price (Low to High)
    await page.locator('[data-test="sort-select"]').selectOption('Price (Low - High)');
    
    // Get all product prices
    const productPrices = page.locator('[data-test="product-price"]');
    const priceTexts = await productPrices.allTextContents();
    const prices = priceTexts.map(text => parseFloat(text.replace('$', '')));
    
    // Verify prices are sorted from low to high
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i - 1]);
    }
  });

  test('should filter by category', async ({ page }) => {
    // Open filters
    await page.getByRole('button', { name: 'Filters' }).click();
    
    // Select Hammer category
    await page.locator('[data-test="category-hammer"]').check();
    
    // Verify only hammer products are shown
    const products = page.locator('[data-test^="product-"]');
    const productTitles = await products.locator('h5').allTextContents();
    
    for (const title of productTitles) {
      expect(title.toLowerCase()).toContain('hammer');
    }
  });

  test('should persist cart across page navigation', async ({ page }) => {
    // Add product to cart
    await page.locator('[data-test="product-01JZV5MZFXT8ADWAMNFK2J97MT"]').click();
    await page.locator('[data-test="add-to-cart"]').click();
    
    // Navigate to different pages
    await page.locator('[data-test="nav-home"]').click();
    await page.locator('[data-test="nav-contact"]').click();
    
    // Verify cart count is still maintained
    await page.getByRole('button', { name: 'Toggle navigation' }).click();
    await expect(page.locator('[data-test="nav-cart"] .cart-count')).toContainText('1');
    
    // Go to cart and verify product is still there
    await page.locator('[data-test="nav-cart"]').click();
    await expect(page.locator('[data-test="cart-item"]')).toContainText('Combination Pliers');
  });

});
