<template>
  <div class="register-container">
    <el-card class="register-card">
      <template #header>
        <div class="card-header">
          <h2>Đăng ký tài khoản</h2>
          <p>Tạo tài khoản mới để bắt đầu</p>
        </div>
      </template>

      <el-form
        ref="registerFormRef"
        :model="registerForm"
        :rules="rules"
        label-position="top"
        class="register-form"
        @submit.prevent="handleRegister"
      >
        <el-form-item label="Họ và tên" prop="fullName">
          <el-input
            v-model="registerForm.fullName"
            placeholder="Nhập họ và tên"
            :prefix-icon="User"
            size="large"
            clearable
          />
        </el-form-item>

        <el-form-item label="Email" prop="email">
          <el-input
            v-model="registerForm.email"
            placeholder="Nhập email"
            :prefix-icon="Message"
            size="large"
            type="email"
            clearable
          />
        </el-form-item>

        <el-form-item label="Mật khẩu" prop="password">
          <el-input
            v-model="registerForm.password"
            placeholder="Nhập mật khẩu"
            :prefix-icon="Lock"
            size="large"
            type="password"
            show-password
            clearable
          />
        </el-form-item>

        <el-form-item label="Xác nhận mật khẩu" prop="confirmPassword">
          <el-input
            v-model="registerForm.confirmPassword"
            placeholder="Nhập lại mật khẩu"
            :prefix-icon="Lock"
            size="large"
            type="password"
            show-password
            clearable
          />
        </el-form-item>

        <el-form-item prop="agree">
          <el-checkbox v-model="registerForm.agree">
            Tôi đồng ý với
            <a href="#" class="link">Điều khoản dịch vụ</a> và
            <a href="#" class="link">Chính sách bảo mật</a>
          </el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            size="default"
            class="submit-btn"
            :loading="loading"
            native-type="submit"
            dark
          >
            Đăng ký
          </el-button>
        </el-form-item>

        <div class="footer-text">
          Đã có tài khoản?
          <a href="#" class="link">Đăng nhập ngay</a>
        </div>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { User, Message, Lock } from '@element-plus/icons-vue'

const registerFormRef = ref<FormInstance>()
const loading = ref(false)

const registerForm = reactive({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  agree: false
})

const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Vui lòng nhập mật khẩu'))
  } else if (value.length < 6) {
    callback(new Error('Mật khẩu phải có ít nhất 6 ký tự'))
  } else {
    callback()
  }
}

const validateConfirmPassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Vui lòng xác nhận mật khẩu'))
  } else if (value !== registerForm.password) {
    callback(new Error('Mật khẩu không khớp'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  fullName: [
    { required: true, message: 'Vui lòng nhập họ và tên', trigger: 'blur' },
    { min: 2, max: 50, message: 'Họ tên từ 2-50 ký tự', trigger: 'blur' }
  ],
  email: [
    { required: true, message: 'Vui lòng nhập email', trigger: 'blur' },
    { type: 'email', message: 'Email không hợp lệ', trigger: 'blur' }
  ],
  password: [
    { required: true, validator: validatePassword, trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, validator: validateConfirmPassword, trigger: 'blur' }
  ],
  agree: [
    {
      type: 'enum',
      enum: [true],
      message: 'Vui lòng đồng ý với điều khoản',
      trigger: 'change'
    }
  ]
})

const handleRegister = async () => {
  if (!registerFormRef.value) return

  await registerFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true

      // Giả lập API call
      setTimeout(() => {
        loading.value = false
        ElMessage.success('Đăng ký thành công!')
        console.log('Form data:', registerForm)
      }, 1500)
    } else {
      ElMessage.error('Vui lòng kiểm tra lại thông tin')
    }
  })
}
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.register-card {
  width: 100%;
  max-width: 480px;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.card-header {
  text-align: center;
}

.card-header h2 {
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: 700;
  color: #333;
}

.card-header p {
  margin: 0;
  font-size: 14px;
  color: #666;
}

.register-form {
  padding: 10px 0;
}

.submit-btn {
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
}

.footer-text {
  text-align: center;
  color: #666;
  font-size: 14px;
  margin-top: 16px;
}

.link {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.link:hover {
  text-decoration: underline;
}

:deep(.el-form-item__label) {
  font-weight: 600;
  color: #333;
}

:deep(.el-input__wrapper) {
  border-radius: 8px;
}

:deep(.el-button--primary) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}

:deep(.el-button--primary:hover) {
  background: linear-gradient(135deg, #5568d3 0%, #63398a 100%);
}
</style>
