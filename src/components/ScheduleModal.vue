<template>
  <el-dialog
    :model-value="visible"
    :title="isEditing ? 'Edit Task' : 'Add New Task'"
    width="650px"
    :close-on-click-modal="false"
    @update:model-value="handleClose"
    class="schedule-modal"
  >
    <el-form
      ref="formRef"
      :model="localFormData"
      :rules="rules"
      label-position="top"
      class="modal-form"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Start Time" prop="startTime">
            <el-time-select
              v-model="localFormData.startTime"
              :start="'00:00'"
              :step="'00:15'"
              :end="'23:45'"
              placeholder="Choose start time"
              format="HH:mm"
              value-format="HH:mm"
              size="large"
              :prefix-icon="Clock"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="End Time" prop="endTime">
            <el-time-select
              v-model="localFormData.endTime"
              :start="'00:00'"
              :step="'00:15'"
              :end="'23:45'"
              placeholder="Choose end time"
              format="HH:mm"
              value-format="HH:mm"
              size="large"
              :prefix-icon="Clock"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="Task" prop="task" class="task-field">
        <el-input
          v-model="localFormData.task"
          placeholder="Enter task description"
          maxlength="100"
          show-word-limit
          clearable
          size="large"
        />
      </el-form-item>

      <el-form-item label="Notes (Optional)" class="notes-field">
        <el-input
          v-model="localFormData.note"
          type="textarea"
          :rows="4"
          placeholder="Additional notes..."
          maxlength="200"
          show-word-limit
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="modal-footer">
        <el-button size="large" @click="handleCancel"> Cancel </el-button>
        <el-button
          type="primary"
          size="large"
          @click="handleSave"
          :disabled="!isFormValid"
          class="save-button"
        >
          <el-icon class="el-icon--left">
            <Check />
          </el-icon>
          {{ isEditing ? 'Save Changes' : 'Add Task' }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Check, Clock } from '@element-plus/icons-vue'

// ============================================
// PROPS & EMITS
// ============================================
const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  isEditing: {
    type: Boolean,
    default: false,
  },
  formData: {
    type: Object,
    required: true,
  },
  schedules: {
    type: Array,
    default: () => [],
  },
  editingSchedule: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['update:visible', 'save', 'cancel'])

// ============================================
// LOCAL STATE
// ============================================
const formRef = ref()
const localFormData = ref({ ...props.formData })

watch(
  () => props.formData,
  (newFormData) => {
    localFormData.value = { ...newFormData }
    if (formRef.value) {
      formRef.value.clearValidate()
    }
  },
  { deep: true }
)

// ============================================
// VALIDATION HELPERS
// ============================================
const timeToMinutes = (time) => {
  if (!time) return 0
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

const hasOverlap = (start1, end1, start2, end2) => {
  const s1 = timeToMinutes(start1)
  const e1 = timeToMinutes(end1)
  const s2 = timeToMinutes(start2)
  const e2 = timeToMinutes(end2)
  return s1 < e2 && s2 < e1
}

const validateStartTime = (rule, value, callback) => {
  if (!value) {
    callback(new Error('Vui lòng chọn giờ bắt đầu'))
    return
  }

  const excludeId = props.editingSchedule?.id
  const newStart = timeToMinutes(value)

  for (const schedule of props.schedules) {
    if (excludeId && schedule.id === excludeId) continue

    const scheduleStart = timeToMinutes(schedule.start_time)
    const scheduleEnd = timeToMinutes(schedule.end_time)

    if (newStart >= scheduleStart && newStart < scheduleEnd) {
      callback(new Error(`Giờ bắt đầu trùng với khung giờ ${schedule.start_time} - ${schedule.end_time}`))
      return
    }
  }

  callback()
}

const validateEndTime = (rule, value, callback) => {
  if (!value) {
    callback(new Error('Vui lòng chọn giờ kết thúc'))
    return
  }

  const { startTime } = localFormData.value

  if (startTime && timeToMinutes(startTime) >= timeToMinutes(value)) {
    callback(new Error('Giờ kết thúc phải sau giờ bắt đầu'))
    return
  }

  const excludeId = props.editingSchedule?.id
  if (startTime && value) {
    for (const schedule of props.schedules) {
      if (excludeId && schedule.id === excludeId) continue

      if (hasOverlap(startTime, value, schedule.start_time, schedule.end_time)) {
        callback(new Error(`Khung giờ trùng với ${schedule.start_time} - ${schedule.end_time}`))
        return
      }
    }
  }

  callback()
}

// ============================================
// VALIDATION RULES
// ============================================
const rules = {
  startTime: [
    { required: true, validator: validateStartTime, trigger: 'blur' }
  ],
  endTime: [
    { required: true, validator: validateEndTime, trigger: 'blur' }
  ],
  task: [
    { required: true, message: 'Vui lòng nhập công việc', trigger: 'blur' },
    { max: 100, message: 'Nhập tối đa 100 ký tự', trigger: 'blur' }
  ],
  note: [
    { max: 200, message: 'Nhập tối đa 200 ký tự', trigger: 'blur' }
  ]
}

// ============================================
// COMPUTED PROPERTIES
// ============================================
const isFormValid = computed(() => {
  return (
    localFormData.value.startTime &&
    localFormData.value.endTime &&
    localFormData.value.task &&
    localFormData.value.task.trim() !== ''
  )
})

// ============================================
// EVENT HANDLERS
// ============================================
const handleClose = (value) => {
  emit('update:visible', value)
}

const handleCancel = () => {
  emit('cancel')
}

const handleSave = async () => {
  if (!formRef.value) return

  await formRef.value.validate((valid) => {
    if (valid) {
      emit('save', { ...localFormData.value })
    }
  })
}
</script>

<style scoped>
.modal-form {
  padding: 0.5rem 0;
}

.task-field,
.notes-field {
  margin-top: 0.5rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding-top: 1rem;
}

.save-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  transition: all 0.3s ease;
}

.save-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.save-button:disabled {
  background: #e5e7eb;
  color: #9ca3af;
  cursor: not-allowed;
}

:deep(.el-dialog__header) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.25rem 1.5rem;
  margin: 0;
  border-radius: 8px 8px 0 0;
}

:deep(.el-dialog__title) {
  color: white;
  font-weight: 600;
  font-size: 1.125rem;
  line-height: 1.5;
}

:deep(.el-dialog__headerbtn) {
  top: 1.25rem;
  right: 1.5rem;
}

:deep(.el-dialog__headerbtn .el-dialog__close) {
  color: white;
  font-size: 1.25rem;
}

:deep(.el-dialog__headerbtn .el-dialog__close:hover) {
  color: rgba(255, 255, 255, 0.8);
}

:deep(.el-dialog__body) {
  padding: 1.5rem 2rem;
}

:deep(.el-dialog__footer) {
  padding: 1rem 2rem 1.5rem;
  border-top: 1px solid #f0f0f0;
}

:deep(.el-form-item) {
  margin-bottom: 2rem;
}

:deep(.el-form-item__label) {
  font-weight: 500;
  color: #606266;
  margin-bottom: 0.5rem;
  line-height: 1.5;
}

:deep(.el-form-item__error) {
  padding-top: 0.25rem;
  font-size: 0.875rem;
}

:deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #dcdfe6 inset;
  transition: all 0.2s ease;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #c0c4cc inset;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #667eea inset;
}

:deep(.el-textarea__inner) {
  font-family: inherit;
  line-height: 1.6;
}

@media (max-width: 768px) {
  :deep(.el-dialog) {
    width: 90% !important;
  }

  :deep(.el-dialog__body) {
    padding: 1rem 1.25rem;
  }

  :deep(.el-dialog__footer) {
    padding: 0.75rem 1.25rem 1rem;
  }
}
</style>
