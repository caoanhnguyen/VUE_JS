<template>
  <el-input
    :placeholder="placeholder"
    :type="type"
    v-model="value"
    clearable
  />
</template>

<script setup>
import { computed } from 'vue'

// 1. "CON" ĐỊNH NGHĨA GIẮC CẮM
const props = defineProps({
  // Đây là giắc "v-model" mà "Cha" sẽ cắm vào
  modelValue: String,

  // Các giắc cắm tùy chỉnh khác
  placeholder: String,
  type: {
    type: String,
    default: 'text'
  }
})

// 2. "CON" ĐỊNH NGHĨA LOA
const emit = defineEmits(['update:modelValue'])

// 3. "CẦU NỐI" V-MODEL (Kỹ thuật nâng cao)
// Bro tạo một "biến ảo" (computed)
const value = computed({
  // GET: Khi "Cha" truyền data (modelValue) xuống
  get() {
    return props.modelValue
  },
  // SET: Khi "Con" (el-input) thay đổi
  set(newValue) {
    // "Con" (MyFormInput) "hét" lên cho "Cha"
    emit('update:modelValue', newValue)
  }
})
</script>
