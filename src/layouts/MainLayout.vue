<template>
  <div class="main-layout">

    <MyHeader />

    <main class="content">
      <router-view />
    </main>

    <MyFooter />

  </div>
</template>

<script setup>
import MyHeader from '@/components/MyHeader.vue'
import MyFooter from '@/components/MyFooter.vue'
</script>

<style scoped>
.content {
  margin: 0 auto;
  min-height: 70vh; /* Đẩy footer xuống */
}

:deep(.register-container) {
  min-height: 0;
}
</style>
