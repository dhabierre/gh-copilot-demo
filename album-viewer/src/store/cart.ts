import { ref, computed } from 'vue'
import type { Album } from '../types/album'

export type CartItem = Album & { qty: number }

const cartItems = ref<CartItem[]>([])
const isDrawerOpen = ref(false)

const STORAGE_KEY = 'cart'

// Function to reset state (for testing)
export const resetCart = () => {
  cartItems.value = []
  isDrawerOpen.value = false
}

export const useCart = () => {
  const loadFromStorage = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        cartItems.value = JSON.parse(stored)
      }
    } catch (e) {
      console.error('Failed to load cart from storage:', e)
    }
  }

  const saveToStorage = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems.value))
    } catch (e) {
      console.error('Failed to save cart to storage:', e)
    }
  }

  const addItem = (album: Album) => {
    const existing = cartItems.value.find(item => item.id === album.id)
    if (existing) {
      existing.qty += 1
    } else {
      cartItems.value.push({ ...album, qty: 1 })
    }
    saveToStorage()
  }

  const removeItem = (id: number) => {
    const idx = cartItems.value.findIndex(item => item.id === id)
    if (idx !== -1) {
      cartItems.value.splice(idx, 1)
      saveToStorage()
    }
  }

  const clear = () => {
    cartItems.value = []
    saveToStorage()
  }

  const getCount = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.qty, 0)
  })

  const getTotal = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.price * item.qty, 0)
  })

  const toggleDrawer = () => {
    isDrawerOpen.value = !isDrawerOpen.value
  }

  const closeDrawer = () => {
    isDrawerOpen.value = false
  }

  return {
    cartItems,
    isDrawerOpen,
    loadFromStorage,
    addItem,
    removeItem,
    clear,
    getCount,
    getTotal,
    toggleDrawer,
    closeDrawer
  }
}