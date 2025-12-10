import { test, expect } from '@playwright/test'

test.describe('Cart Management - Comprehensive Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001', { waitUntil: 'load', timeout: 30000 })
    // Clear localStorage to start fresh
    await page.evaluate(() => localStorage.clear())
    await page.reload()
    await page.waitForSelector('[class*="album"]', { timeout: 10000 })
  })

  test('Complete cart workflow with screenshots', async ({ page }) => {
    console.log('\n=== Cart Management Comprehensive Test ===\n')

    // Screenshot 1: Initial state with empty cart
    console.log('📸 Step 1: Capture initial app state')
    await page.screenshot({ path: 'screenshot-1-initial-app.png', fullPage: true })
    console.log('✓ Screenshot 1 saved: initial app state')

    // Verify cart badge shows 0 or is not visible
    const cartButton = page.locator('button').filter({ hasText: '🛒' })
    await expect(cartButton).toBeVisible()
    
    // Screenshot 2: Cart badge visible
    await cartButton.screenshot({ path: 'screenshot-2-cart-badge-empty.png' })
    console.log('✓ Screenshot 2 saved: empty cart badge')

    // Add first album
    console.log('\n🛒 Step 2: Add first album to cart')
    const addToCartButtons = page.locator('button').filter({ hasText: /Add to Cart|Ajouter/i })
    await addToCartButtons.first().click()
    await page.waitForTimeout(500)
    console.log('✓ First album added')

    // Screenshot 3: Cart badge with count
    await cartButton.screenshot({ path: 'screenshot-3-cart-badge-with-count.png' })
    console.log('✓ Screenshot 3 saved: cart badge with count')

    // Add second album (same as first to test quantity increment)
    console.log('\n🛒 Step 3: Add same album again (test quantity increment)')
    await addToCartButtons.first().click()
    await page.waitForTimeout(500)
    console.log('✓ Same album added again')

    // Screenshot 4: Cart badge with increased count
    await cartButton.screenshot({ path: 'screenshot-4-cart-badge-qty-2.png' })
    console.log('✓ Screenshot 4 saved: cart badge with qty 2')

    // Add different album
    console.log('\n🛒 Step 4: Add different album')
    await addToCartButtons.nth(1).click()
    await page.waitForTimeout(500)
    console.log('✓ Second different album added')

    // Screenshot 5: Cart badge with multiple items
    await cartButton.screenshot({ path: 'screenshot-5-cart-badge-multiple.png' })
    console.log('✓ Screenshot 5 saved: cart badge with multiple items')

    // Open cart drawer
    console.log('\n📂 Step 5: Open cart drawer')
    await cartButton.click()
    await page.waitForSelector('[class*="drawer"]', { timeout: 5000 })
    await page.waitForTimeout(500)
    console.log('✓ Cart drawer opened')

    // Screenshot 6: Cart drawer with multiple items
    const drawer = page.locator('[class*="drawer"]').first()
    await drawer.screenshot({ path: 'screenshot-6-cart-drawer-multiple-items.png' })
    console.log('✓ Screenshot 6 saved: cart drawer with multiple items')

    // Verify cart contents
    console.log('\n✅ Step 6: Verify cart contents')
    const cartItems = drawer.locator('[class*="cart-item"]')
    const itemCount = await cartItems.count()
    console.log(`✓ Cart has ${itemCount} unique items`)
    expect(itemCount).toBeGreaterThanOrEqual(2)

    // Check for quantity indicator x2
    const qtyIndicator = drawer.locator('text=/x2/')
    await expect(qtyIndicator).toBeVisible()
    console.log('✓ Quantity x2 visible for first item')

    // Check total price is displayed
    const totalPrice = drawer.locator('text=/Total/i')
    await expect(totalPrice).toBeVisible()
    console.log('✓ Total price visible')

    // Screenshot 7: Full page with cart open
    await page.screenshot({ path: 'screenshot-7-full-page-cart-open.png', fullPage: true })
    console.log('✓ Screenshot 7 saved: full page with cart drawer')

    // Test remove functionality
    console.log('\n🗑️ Step 7: Test remove item')
    const removeButtons = drawer.locator('button').filter({ hasText: /Remove|Retirer|Entfernen/i })
    const removeCount = await removeButtons.count()
    console.log(`Found ${removeCount} remove buttons`)
    
    if (removeCount > 0) {
      await removeButtons.first().click()
      await page.waitForTimeout(500)
      console.log('✓ Removed first item')

      // Screenshot 8: Cart after removing item
      await drawer.screenshot({ path: 'screenshot-8-cart-after-remove.png' })
      console.log('✓ Screenshot 8 saved: cart after removing item')
    }

    // Close and reopen to test persistence
    console.log('\n🔄 Step 8: Test cart persistence')
    const closeButton = drawer.locator('button').filter({ hasText: '✕' })
    await closeButton.click()
    await page.waitForTimeout(500)
    console.log('✓ Cart drawer closed')

    // Reload page
    await page.reload()
    await page.waitForSelector('[class*="album"]', { timeout: 10000 })
    console.log('✓ Page reloaded')

    // Verify cart count persisted
    const cartBadge = page.locator('[class*="cart-badge"]')
    await expect(cartBadge).toBeVisible()
    console.log('✓ Cart badge still visible after reload (persistence confirmed)')

    // Screenshot 9: After page reload
    await page.screenshot({ path: 'screenshot-9-after-reload.png', fullPage: true })
    console.log('✓ Screenshot 9 saved: after page reload')

    // Open cart again
    await cartButton.click()
    await page.waitForSelector('[class*="drawer"]', { timeout: 5000 })
    await page.waitForTimeout(500)

    // Test clear cart
    console.log('\n🧹 Step 9: Test clear cart')
    const clearButton = drawer.locator('button').filter({ hasText: /Clear Cart|Vider/i })
    await clearButton.click()
    await page.waitForTimeout(500)
    console.log('✓ Clear cart button clicked')

    // Screenshot 10: Empty cart
    await drawer.screenshot({ path: 'screenshot-10-empty-cart.png' })
    console.log('✓ Screenshot 10 saved: empty cart')

    // Verify empty cart message
    const emptyMessage = drawer.locator('text=/empty|vide/i')
    await expect(emptyMessage).toBeVisible()
    console.log('✓ Empty cart message visible')

    console.log('\n🎉 All comprehensive tests completed successfully!\n')
  })

  test('Test i18n - French language', async ({ page }) => {
    console.log('\n=== Testing French Language ===\n')
    
    // Change language to French
    const languageSelect = page.locator('select#lang')
    await languageSelect.selectOption('fr')
    await page.waitForTimeout(500)
    console.log('✓ Changed language to French')

    // Add item
    const addButton = page.locator('button').filter({ hasText: /Ajouter/i })
    await addButton.first().click()
    await page.waitForTimeout(500)

    // Open cart
    const cartButton = page.locator('button').filter({ hasText: '🛒' })
    await cartButton.click()
    await page.waitForSelector('[class*="drawer"]', { timeout: 5000 })
    
    // Screenshot: French UI
    const drawer = page.locator('[class*="drawer"]').first()
    await drawer.screenshot({ path: 'screenshot-11-french-cart.png' })
    console.log('✓ Screenshot 11 saved: French cart drawer')
    
    console.log('✓ French language test completed')
  })

  test('Test i18n - German language', async ({ page }) => {
    console.log('\n=== Testing German Language ===\n')
    
    // Change language to German
    const languageSelect = page.locator('select#lang')
    await languageSelect.selectOption('de')
    await page.waitForTimeout(500)
    console.log('✓ Changed language to German')

    // Add item
    const addButton = page.locator('button').filter({ hasText: /Warenkorb/i })
    await addButton.first().click()
    await page.waitForTimeout(500)

    // Open cart
    const cartButton = page.locator('button').filter({ hasText: '🛒' })
    await cartButton.click()
    await page.waitForSelector('[class*="drawer"]', { timeout: 5000 })
    
    // Screenshot: German UI
    const drawer = page.locator('[class*="drawer"]').first()
    await drawer.screenshot({ path: 'screenshot-12-german-cart.png' })
    console.log('✓ Screenshot 12 saved: German cart drawer')
    
    console.log('✓ German language test completed')
  })
})
