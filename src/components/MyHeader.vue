<template>
  <header class="header">
    <div class="container">
      <div class="header-left">
        <router-link to="/" class="logo">
          <div class="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 11l3 3L22 4"></path>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
            </svg>
          </div>
          <span class="logo-text">caoanh_ng.</span>
        </router-link>

        <!-- Added router-link navigation with active state and animated underline -->
        <nav class="nav-menu">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="nav-item"
          >
            {{ item.name }}
          </router-link>
        </nav>
      </div>

      <el-switch
        v-model="lang"
        inline-prompt
        style="--el-switch-on-color: #667eea; --el-switch-off-color: #764ba2;"
        active-text="Vi"
        inactive-text="En"
        size="large"
        @change="changeLang"
        active-value="vi"
        inactive-value="en"
      />

      <div class="header-actions">
        <button class="icon-button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
        </button>
        <button class="icon-button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </button>
        <button class="icon-button">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const navItems = [
  { name: 'HOME', path: '/home' },
  { name: 'DAY 4', path: '/register2' },
  { name: 'DAY 6', path: '/register2' },
  { name: 'TODO LIST', path: '/todos' },
  { name: 'SCHEDULE TODO', path: 'schedule-todo' },
]

const lang = ref(localStorage.getItem('LANG') || 'vi')
const { locale } = useI18n()

const changeLang = v => {
  locale.value = v
  localStorage.setItem('LANG', v)
}
</script>

<style scoped>
.header {
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

/* Added header-left to group logo and nav */
.header-left {
  display: flex;
  align-items: center;
  gap: 3rem;
  flex: 1;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  flex-shrink: 0;
  text-decoration: none;
}

.logo-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.logo-icon svg {
  width: 18px;
  height: 18px;
}

.logo-text {
  font-size: 1rem;
  font-weight: 700;
  color: #212529;
  letter-spacing: 0.5px;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

/* Enhanced nav-item with animated underline on active/hover */
.nav-item {
  font-size: 0.875rem;
  font-weight: 500;
  color: #6c757d;
  text-decoration: none;
  letter-spacing: 0.5px;
  transition: color 0.3s;
  cursor: pointer;
  white-space: nowrap;
  position: relative;
  padding: 0.5rem;
}

/* Animated underline effect */
.nav-item::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s ease;
}

.nav-item:hover {
  color: #667eea;
}

.nav-item:hover::after {
  width: 100%;
}

/* Active state with full underline and bright color */
.nav-item.router-link-active {
  color: #667eea;
  font-weight: 600;
}

.nav-item.router-link-active::after {
  width: 100%;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex-shrink: 0;
}

.icon-button {
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  color: #6c757d;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s;
  padding: 0;
}

.icon-button:hover {
  background: #f8f9fa;
  color: #667eea;
}

.icon-button svg {
  width: 20px;
  height: 20px;
}

@media (max-width: 1024px) {
  .header-left {
    gap: 2rem;
  }

  .nav-menu {
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 1rem 1.5rem;
  }

  .nav-menu {
    display: none;
  }

  .header-actions {
    gap: 0.5rem;
  }
}
</style>
