<template>
  <transition name="drawer">
    <div v-if="isDrawerOpen" class="drawer-overlay" @click="closeDrawer">
      <div class="drawer" @click.stop>
        <div class="drawer-header">
          <h2>{{ t('cart.title') }}</h2>
          <button class="close-btn" @click="closeDrawer">✕</button>
        </div>
        
        <div class="drawer-content">
          <div v-if="cartItems.length === 0" class="empty-cart">
            <p>{{ t('cart.empty') }}</p>
          </div>
          <div v-else class="cart-items">
            <div v-for="item in cartItems" :key="item.id" class="cart-item">
              <img :src="item.image_url" :alt="item.title" class="item-image" />
              <div class="item-details">
                <h4>{{ item.title }}</h4>
                <p class="artist">{{ item.artist }}</p>
                <div class="item-price">
                  <span>${{ (item.price * item.qty).toFixed(2) }}</span>
                  <span class="qty">x{{ item.qty }}</span>
                </div>
              </div>
              <button class="remove-btn" @click="removeItem(item.id)">
                {{ t('cart.remove') }}
              </button>
            </div>
          </div>
        </div>

        <div v-if="cartItems.length > 0" class="drawer-footer">
          <div class="total-row">
            <span>{{ t('cart.total') }}:</span>
            <span class="total-price">${{ getTotal.toFixed(2) }}</span>
          </div>
          <button class="clear-btn" @click="clear">{{ t('cart.clear') }}</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useCart } from '../store/cart'

const { t } = useI18n()
const { cartItems, isDrawerOpen, removeItem, clear, getTotal, closeDrawer } = useCart()
</script>

<style scoped>
.drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.drawer {
  position: fixed;
  right: 0;
  top: 0;
  bottom: 0;
  width: 400px;
  background: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  z-index: 1000;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #eee;
}

.drawer-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  transition: color 0.3s;
}

.close-btn:hover {
  color: #333;
}

.drawer-content {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.empty-cart {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #999;
  font-size: 1.1rem;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fafafa;
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
  flex-shrink: 0;
}

.item-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.item-details h4 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  color: #333;
}

.artist {
  margin: 0 0 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
}

.item-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  color: #667eea;
}

.qty {
  font-size: 0.9rem;
  color: #999;
}

.remove-btn {
  align-self: flex-start;
  padding: 0.5rem 1rem;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.3s;
  white-space: nowrap;
}

.remove-btn:hover {
  background: #ff5252;
}

.drawer-footer {
  padding: 1.5rem;
  border-top: 1px solid #eee;
  background: #fafafa;
}

.total-row {
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
}

.total-price {
  color: #667eea;
}

.clear-btn {
  width: 100%;
  padding: 0.75rem;
  background: #ff6b6b;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.clear-btn:hover {
  background: #ff5252;
}

.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s ease;
}

.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .drawer {
    width: 100%;
  }
}
</style>
