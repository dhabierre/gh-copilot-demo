import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useCart, resetCart } from '../src/store/cart'
import type { Album } from '../src/types/album'

describe('Cart Store', () => {
  beforeEach(() => {
    localStorage.clear()
    resetCart()
    vi.clearAllMocks()
  })

  const mockAlbum: Album = {
    id: 1,
    title: 'Test Album',
    artist: 'Test Artist',
    price: 9.99,
    image_url: 'https://example.com/image.jpg'
  }

  const mockAlbum2: Album = {
    id: 2,
    title: 'Test Album 2',
    artist: 'Test Artist 2',
    price: 12.99,
    image_url: 'https://example.com/image2.jpg'
  }

  describe('addItem', () => {
    it('should add a new item to the cart with qty 1', () => {
      const cart = useCart()
      cart.addItem(mockAlbum)
      
      expect(cart.cartItems.value).toHaveLength(1)
      expect(cart.cartItems.value[0]).toEqual({ ...mockAlbum, qty: 1 })
    })

    it('should increment qty if item already exists', () => {
      const cart = useCart()
      cart.addItem(mockAlbum)
      cart.addItem(mockAlbum)
      
      expect(cart.cartItems.value).toHaveLength(1)
      expect(cart.cartItems.value[0].qty).toBe(2)
    })

    it('should save to localStorage after adding', () => {
      const cart = useCart()
      cart.addItem(mockAlbum)
      
      const stored = JSON.parse(localStorage.getItem('cart') || '[]')
      expect(stored).toHaveLength(1)
      expect(stored[0].id).toBe(mockAlbum.id)
    })
  })

  describe('removeItem', () => {
    it('should remove an item from the cart', () => {
      const cart = useCart()
      cart.addItem(mockAlbum)
      cart.addItem(mockAlbum2)
      
      cart.removeItem(mockAlbum.id)
      
      expect(cart.cartItems.value).toHaveLength(1)
      expect(cart.cartItems.value[0].id).toBe(mockAlbum2.id)
    })

    it('should not error if item does not exist', () => {
      const cart = useCart()
      expect(() => cart.removeItem(999)).not.toThrow()
    })

    it('should save to localStorage after removing', () => {
      const cart = useCart()
      cart.addItem(mockAlbum)
      cart.removeItem(mockAlbum.id)
      
      const stored = JSON.parse(localStorage.getItem('cart') || '[]')
      expect(stored).toHaveLength(0)
    })
  })

  describe('clear', () => {
    it('should clear all items from the cart', () => {
      const cart = useCart()
      cart.addItem(mockAlbum)
      cart.addItem(mockAlbum2)
      
      cart.clear()
      
      expect(cart.cartItems.value).toHaveLength(0)
    })

    it('should save empty array to localStorage', () => {
      const cart = useCart()
      cart.addItem(mockAlbum)
      cart.clear()
      
      const stored = JSON.parse(localStorage.getItem('cart') || '[]')
      expect(stored).toHaveLength(0)
    })
  })

  describe('getCount', () => {
    it('should return 0 for empty cart', () => {
      const cart = useCart()
      expect(cart.getCount.value).toBe(0)
    })

    it('should return sum of quantities', () => {
      const cart = useCart()
      cart.addItem(mockAlbum)
      cart.addItem(mockAlbum)
      cart.addItem(mockAlbum2)
      
      expect(cart.getCount.value).toBe(3)
    })
  })

  describe('getTotal', () => {
    it('should return 0 for empty cart', () => {
      const cart = useCart()
      expect(cart.getTotal.value).toBe(0)
    })

    it('should calculate total price correctly', () => {
      const cart = useCart()
      cart.addItem(mockAlbum)      // 9.99
      cart.addItem(mockAlbum)      // 9.99 * 2 = 19.98
      cart.addItem(mockAlbum2)     // 12.99
      
      const expected = 9.99 + 9.99 + 12.99
      expect(cart.getTotal.value).toBeCloseTo(expected, 2)
    })
  })

  describe('persistence', () => {
    it('should load cart from localStorage', () => {
      const initialData = [{ ...mockAlbum, qty: 2 }]
      localStorage.setItem('cart', JSON.stringify(initialData))
      
      const cart = useCart()
      cart.loadFromStorage()
      
      expect(cart.cartItems.value).toHaveLength(1)
      expect(cart.cartItems.value[0].qty).toBe(2)
    })

    it('should handle invalid JSON in localStorage gracefully', () => {
      localStorage.setItem('cart', 'invalid-json')
      
      const cart = useCart()
      expect(() => cart.loadFromStorage()).not.toThrow()
    })
  })

  describe('drawer toggle', () => {
    it('should toggle drawer state', () => {
      const cart = useCart()
      
      expect(cart.isDrawerOpen.value).toBe(false)
      cart.toggleDrawer()
      expect(cart.isDrawerOpen.value).toBe(true)
      cart.toggleDrawer()
      expect(cart.isDrawerOpen.value).toBe(false)
    })

    it('should close drawer', () => {
      const cart = useCart()
      cart.isDrawerOpen.value = true
      
      cart.closeDrawer()
      expect(cart.isDrawerOpen.value).toBe(false)
    })
  })
})
