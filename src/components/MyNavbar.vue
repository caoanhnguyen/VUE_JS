<template>
  <nav class="navbar">
    <div class="container">
      <ul class="nav-list">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="nav-item"
          v-slot="{ href, navigate, isActive }"
        >
          <a
            :href="href"
            @click="navigate"
            :class="{ active: isActive }"
          >
            {{ item.name }}
          </a>
        </router-link>
      </ul>
    </div>
  </nav>
</template>

<script setup>
const navItems = [
  { name: 'HOME', path: '/' },
  { name: 'DAY4', path: '/register2' },
  { name: 'TODO', path: '/todos' },
]
</script>

<style scoped>
.navbar {
  background: white;
  border-bottom: 1px solid #e5e7eb;
}
.nav-list {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.5rem 1.5rem;
}

.nav-item { /* Đổi từ .nav-item a */
  display: block;
  padding: 1rem 1rem;
  color: #6b7280;
  text-decoration: none;
  font-weight: 500;
  position: relative;
  transition: color 0.2s;
}

.nav-item.active { /* Đổi từ .nav-item a.active */
  color: #3b82f6;
}
.nav-item.active::after { /* Đổi từ .nav-item a.active::after */
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #3b82f6;
}

@media (max-width: 768px) {
  .nav-list {
    gap: 1rem;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .nav-item a {
    font-size: 0.875rem;
    white-space: nowrap;
  }

  .container {
    padding: 0 1rem;
  }
}
</style>
