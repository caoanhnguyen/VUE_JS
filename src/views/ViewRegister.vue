<script setup>
import { ref, reactive } from 'vue'
import RegisterForm from '@/components/RegisterForm.vue'
import { ElMessage } from 'element-plus'
import router from '@/router/index.js'

const validatePassword = (rule, value, callback) => {
  if(value === '') {
    callback(new Error('Vui lòng nhập mật khẩu'))
  } else if(value.length < 6) {
    callback(new Error('Mật khẩu phải có ít nhất 6 ký tự'))
  } else {
    callback()
  }
}

const validateConfirmPassword = (rule, value, callback) => {
  if(value === '') {
    callback(new Error('Vui lòng xác nhận mật khẩu'))
  } else if(value !== formData.value.password) {
    callback(new Error('Mật khẩu không khớp'))
  } else {
    callback()
  }
}

const validateRegisterDates = (rule, value, callback) => {
  const { startDate, endDate } = formData.value
  if (!startDate || !endDate) {
    callback(new Error('Vui lòng chọn cả ngày bắt đầu và ngày kết thúc'))
  } else if (new Date(startDate) >= new Date(endDate)) {
    callback(new Error('Ngày kết thúc phải sau ngày bắt đầu'))
  } else {
    callback()
  }
}

const validateDateOfBirth = (rule, value, callback) => {
  if (!value) {
    callback(new Error('Vui lòng chọn ngày sinh'))
  } else {
    const today = new Date()
    const birthDate = new Date(value)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    if (age < 18) {
      callback(new Error('Bạn phải từ 18 tuổi trở lên để đăng ký'))
    } else {
      callback()
    }
  }
}

const formData = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  dateOfBirth: null,
  startDate: null,
  endDate: null,
  agreeToTerms: false,
})

const rules = reactive({
  username: [
    { required: true, message: 'Vui lòng nhập tên đăng nhập', trigger: 'blur' },
    { min: 6, max: 15, message: 'Tên đăng nhập phải từ 6 đến 15 ký tự', trigger: 'blur' }
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
  dateOfBirth: [
    { type: 'date', required: true, validator: validateDateOfBirth, trigger: 'change' }
  ],
  startDate: [
    { type: 'date', required: true, message: 'Vui lòng chọn ngày bắt đầu', trigger: 'change' }
  ],
  endDate: [
    { type: 'date', required: true, validator: validateRegisterDates, trigger: 'change' }
  ],
  agreeToTerms: [
    { type: 'enum', enum: [true], message: 'Vui lòng đồng ý với điều khoản', trigger: 'change' }
  ]
})

const handleSubmit = () => {
  // Xử lý đăng ký
  ElMessage.success('Đăng ký thành công!')
  router.replace('/')
}


</script>

<template>
  <div>
    <RegisterForm
      :formData="formData"
      :rules="rules"
      @submit="handleSubmit" />
  </div>
</template>

<style scoped></style>
