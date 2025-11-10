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
// Import 3 "viên gạch" đã sửa
import MyHeader from '@/components/MyHeader.vue'
import MyFooter from '@/components/MyFooter.vue'
</script>

<style scoped>
.content {
  /* Style cho "khung" nội dung chính */
  margin: 0 auto;
  min-height: 70vh; /* Đẩy footer xuống */
}

/* Style "global" cho các trang login/register
  (nếu bro muốn căn giữa)
*/
:deep(.register-container) {
  min-height: 0; /* Hủy cái min-height 100vh cũ */
}
</style>
