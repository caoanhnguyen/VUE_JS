<template>
  <div class="login-page">

    <el-form @submit.prevent="handleSubmit">

      <h1>Đăng nhập (dùng Element Plus)</h1>

      <el-input
        v-model="username"
        placeholder="Tên đăng nhập"
        clearable
      />

      <el-input
        v-model="password"
        placeholder="Mật khẩu"
        type="password"
        show-password
      />

      <el-button
        type="primary"
        @click="handleSubmit"
      >
        Đăng nhập
      </el-button>

    </el-form>
  </div>
</template>

<script setup>
// Bro vẫn dùng "bộ não" Composition API
import { ref } from 'vue'

// "Bộ não" của Cha
const username = ref('')
const password = ref('')

function handleSubmit() {
  // Logic y hệt: v-model đã tự động điền data
  console.log('Gửi đi:', username.value, password.value)
  // api.post('/login', { ... })
}
</script>

<style scoped>
/* Style CỦA CHA, bro chỉ cần lo bố cục
  còn "ruột" (input, button) đã đẹp sẵn.
*/
.login-page {
  width: 350px;
  margin: 50px auto;
}
/* CSS của Element Plus tự động thêm khoảng cách */
.el-input {
  margin-bottom: 15px;
}
.el-button {
  width: 100%;
}
</style>
