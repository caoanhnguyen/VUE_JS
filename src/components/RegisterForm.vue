<script setup>

import { ref } from 'vue'
import { Message, User, Lock } from '@element-plus/icons-vue'

const registerFormRef = ref(null)

const props = defineProps({
  formData: {
    type: Object,
    required: true
  },
  rules: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['submit'])

const loading = ref(false)

const handleRegister = () => {
  registerFormRef.value.validate((valid) => {
    if (valid) {
      loading.value = true
      // Simulate an API call
      setTimeout(() => {
        loading.value = false
        // Emit the submit event to parent component
        emit('submit')
      }, 2000)
    }
  })
}

</script>

<template>
  <div class="register-container">

    <el-card class="box-card">

      <template #header>
        <div class="card-header">
          <h1>Register</h1>
          <h3>Register new account to start!</h3>
        </div>
      </template>

      <el-form
        label-position="top"
        ref="registerFormRef"
        :model="props.formData"
        :rules="props.rules"
        @submit.prevent="handleRegister"
      >
        <el-form-item
          label="User Name"
          prop="username"
        >
          <el-input
            v-model="props.formData.username"
            placeholder="Enter your user name"
            :prefix-icon="User"
            size="large"
            clearable
          />
        </el-form-item>

        <el-form-item
          label="Email"
          prop="email"
          >
          <el-input
            v-model="props.formData.email"
            placeholder="Enter your email"
            :prefix-icon="Message"
            size="large"
            type="email"
            clearable
            >
          </el-input>
        </el-form-item>

        <el-form-item
          label="Password"
          prop="password"
        >
          <el-input
            v-model="props.formData.password"
            placeholder="Enter your password"
            :prefix-icon="Lock"
            size="large"
            type="password"
            show-password
            clearable
          />
        </el-form-item>

        <el-form-item
          label="Confirm Password"
          prop="confirmPassword"
        >
          <el-input
            v-model="props.formData.confirmPassword"
            placeholder="Re-enter your password"
            :prefix-icon="Lock"
            size="large"
            type="password"
            show-password
            clearable
          />
        </el-form-item>

        <el-form-item
          label="Date of Birth"
          prop="dateOfBirth"
        >
          <el-date-picker
            v-model="props.formData.dateOfBirth"
            type="date"
            placeholder="Select your date of birth"
            size="large"
            style="width: 100%;"
          />
        </el-form-item>

        <el-form-item
          label="Start Date"
          prop="startDate"
        >
          <el-date-picker
            v-model="props.formData.startDate"
            type="date"
            placeholder="Select start date"
            size="large"
            style="width: 100%;"
          />
        </el-form-item>

        <el-form-item
          label="End Date"
          prop="endDate"
        >
          <el-date-picker
            v-model="props.formData.endDate"
            type="date"
            placeholder="Select end date"
            size="large"
            style="width: 100%;"
          />
        </el-form-item>

        <el-form-item prop="agreeToTerms">
          <el-checkbox v-model="props.formData.agreeToTerms">
            I agree to the
            <a href="#" class="link">Terms of Service</a> and
            <a href="#" class="link">Privacy Policy</a>
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
            Register
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.register-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  width: 100vw;
  box-sizing: border-box;
}
.box-card {
  width: 450px; /* Hoặc 500px tùy bro */
  border-radius: 20px;
}

/* 2. Căn giữa cái chữ trong header */
.card-header {
  text-align: center;
}

/* 3. Sửa lại CSS của bro 1 tí cho đẹp */
/* (Cái :deep() này để "đâm thủng" scoped CSS,
   chỉnh style của component con Element Plus) */
:deep(.el-input) {
  /* Thêm cái này cho nó "mềm" */
  border-radius: 4px;
}

:deep(.el-button) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  align-items: center;
}

.submit-btn {
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
  margin-top: 8px;
}

.card-header {
  text-align: center;
}

.card-header h1 {
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

:deep(.el-form-item__label) {
  font-weight: 600;
  color: #333;
}

:deep(.el-button--primary:hover) {
  background: linear-gradient(135deg, #5568d3 0%, #63398a 100%);
}
</style>
