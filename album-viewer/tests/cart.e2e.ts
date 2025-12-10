import { test, expect } from '@playwright/test'

test.describe('Album App - Cart Management', () => {
  test('Add album to cart and view in drawer', async ({ page }) => {
    // Step 1: Open the Album App
    console.log('Step 1: Opening Album App at http://localhost:3001')
    await page.goto('http://localhost:3001')
    
    // Wait for albums to load
    await page.waitForSelector('[class*="album-card"]', { timeout: 10000 })
    console.log('✓ Album App loaded successfully')

    // Step 2: Click "Add to cart" on the first tile
    console.log('Step 2: Clicking Add to Cart on first album')
    const addToCartButtons = page.locator('button', { hasText: /Add to Cart|Ajouter au panier|In den Warenkorb/ })
    await addToCartButtons.first().click()
    console.log('✓ Clicked Add to Cart button')

    // Step 3: Click cart button on top right
    console.log('Step 3: Clicking cart button')
    const cartButton = page.locator('button[class*="cart-btn"]')
    await cartButton.click()
    console.log('✓ Clicked cart button')

    // Wait for drawer to open
    await page.waitForSelector('[class*="drawer"]', { timeout: 5000 })
    console.log('✓ Cart drawer opened')

    // Step 4: Check that cart contains the added album
    console.log('Step 4: Verifying cart contains the album')
    const cartContent = page.locator('[class*="drawer"]')
    
    // Check for album title (should be "Hybrid Theory" - first album)
    const albumTitle = cartContent.locator('h4')
    await expect(albumTitle).toContainText(/Hybrid Theory|Back in Black|The Dark Side|Black Album|Nevermind|Appetite/)
    console.log('✓ Album title found in cart')

    // Check for artist name
    const artistName = cartContent.locator('[class*="artist"]')
    await expect(artistName).toBeVisible()
    console.log('✓ Artist name visible in cart')

    // Check for price
    const price = cartContent.locator('text=/\\$\\d+\\.\\d{2}/')
    await expect(price).toBeVisible()
    console.log('✓ Price visible in cart')

    // Check for quantity
    const quantity = cartContent.locator('text=/x\\d+/')
    await expect(quantity).toBeVisible()
    console.log('✓ Quantity visible in cart')

    // Step 5: Take a screenshot of the cart
    console.log('Step 5: Taking screenshot of cart')
    await page.screenshot({ path: 'cart-screenshot.png', fullPage: false })
    console.log('✓ Screenshot saved as cart-screenshot.png')

    console.log('\n✅ All steps completed successfully!')
  })
})
