import { test, expect } from '@playwright/test'

test.describe('Album App - Cart Management', () => {
  test.beforeEach(async ({ page }) => {
    // Wait for and navigate to the app
    await page.goto('http://localhost:3001', { waitUntil: 'load', timeout: 30000 })
  })

  test('Add album to cart and view in drawer', async ({ page }) => {
    // Step 1: Verify app loaded
    console.log('\n📱 Step 1: Verify Album App loaded')
    const heading = page.locator('h1')
    await expect(heading).toBeVisible({ timeout: 10000 })
    console.log('✓ App title visible:', await heading.textContent())

    // Wait for albums to load
    await page.waitForSelector('[class*="album"]', { timeout: 10000 })
    console.log('✓ Albums loaded')

    // Step 2: Click Add to Cart on first album
    console.log('\n📝 Step 2: Click Add to Cart button')
    // Get all buttons and find one with "Add to Cart" text
    const buttons = page.locator('button')
    const buttonCount = await buttons.count()
    console.log(`Found ${buttonCount} buttons on page`)
    
    let clicked = false
    for (let i = 0; i < Math.min(buttonCount, 10); i++) {
      const buttonText = await buttons.nth(i).textContent()
      console.log(`Button ${i}: "${buttonText}"`)
      if (buttonText?.includes('Add') || buttonText?.includes('Ajouter') || buttonText?.includes('Warenkorb')) {
        await buttons.nth(i).click()
        clicked = true
        console.log(`✓ Clicked button: "${buttonText}"`)
        break
      }
    }
    expect(clicked).toBe(true)

    // Step 3: Click cart button
    console.log('\n🛒 Step 3: Click cart button in header')
    const cartButton = page.locator('button').filter({ hasText: '🛒' })
    await expect(cartButton).toBeVisible({ timeout: 5000 })
    await cartButton.click()
    console.log('✓ Cart button clicked')

    // Wait for drawer to open
    await page.waitForSelector('[class*="drawer"]', { timeout: 5000 })
    await page.waitForTimeout(500) // Small delay for animation
    console.log('✓ Cart drawer opened')

    // Step 4: Verify cart content
    console.log('\n✅ Step 4: Verify cart contains album')
    const drawer = page.locator('[class*="drawer"]').first()
    await expect(drawer).toBeVisible()

    // Check for album title
    const titleEl = drawer.locator('h4').first()
    await expect(titleEl).toBeVisible()
    const title = await titleEl.textContent()
    console.log(`✓ Album in cart: "${title}"`)

    // Check for artist
    const artistEl = drawer.locator('[class*="artist"]').first()
    await expect(artistEl).toBeVisible()
    const artist = await artistEl.textContent()
    console.log(`✓ Artist: "${artist}"`)

    // Check for price and quantity
    const priceElements = drawer.locator('text=/\\$/')
    const priceCount = await priceElements.count()
    expect(priceCount).toBeGreaterThan(0)
    console.log('✓ Price visible in cart')

    const qtyEl = drawer.locator('text=/x[0-9]+/')
    const qtyVisible = await qtyEl.isVisible()
    expect(qtyVisible).toBe(true)
    console.log('✓ Quantity visible in cart')

    // Step 5: Screenshot
    console.log('\n📸 Step 5: Taking screenshot')
    await drawer.screenshot({ path: 'cart-drawer.png' })
    console.log('✓ Screenshot saved: cart-drawer.png')

    console.log('\n🎉 All steps completed successfully!\n')
  })
})

