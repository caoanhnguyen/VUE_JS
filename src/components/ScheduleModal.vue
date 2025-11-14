<template>
  <el-dialog
    :model-value="visible"
    :title="isEditing ? 'Edit Task' : 'Add New Task'"
    width="650px"
    :close-on-click-modal="false"
    @update:model-value="handleClose"
    class="schedule-modal"
  >
    <el-form :model="localFormData" label-position="top" class="modal-form">
      <!-- Improved time pickers layout with better spacing -->
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item
            label="Start Time"
            :error="startTimeError"
            :validate-status="startTimeError ? 'error' : ''"
          >
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
          <el-form-item
            label="End Time"
            :error="endTimeError"
            :validate-status="endTimeError ? 'error' : ''"
          >
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

      <!-- Better spacing for task field -->
      <el-form-item label="Task" class="task-field">
        <el-input
          v-model="localFormData.task"
          placeholder="Enter task description"
          maxlength="100"
          show-word-limit
          clearable
          size="large"
        />
      </el-form-item>

      <!-- Better spacing for notes field -->
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
const localFormData = ref({ ...props.formData })
const startTimeError = ref('')
const endTimeError = ref('')

watch(
  () => props.formData,
  (newFormData) => {
    localFormData.value = { ...newFormData }
    startTimeError.value = ''
    endTimeError.value = ''
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

// ============================================
// REALTIME VALIDATION
// ============================================
watch(
  () => localFormData.value.startTime,
  (newStartTime) => {
    if (!newStartTime) {
      startTimeError.value = ''
      return
    }

    const excludeId = props.editingSchedule?.id
    const newStart = timeToMinutes(newStartTime)

    for (const schedule of props.schedules) {
      if (excludeId && schedule.id === excludeId) continue

      const scheduleStart = timeToMinutes(schedule.start_time)
      const scheduleEnd = timeToMinutes(schedule.end_time)

      if (newStart >= scheduleStart && newStart < scheduleEnd) {
        startTimeError.value = `Giờ bắt đầu trùng với khung giờ ${schedule.start_time} - ${schedule.end_time}`
        return
      }
    }

    startTimeError.value = ''

    // Re-validate end time if it exists
    if (localFormData.value.endTime) {
      validateEndTime()
    }
  }
)

const validateEndTime = () => {
  const { startTime, endTime } = localFormData.value

  if (!endTime) {
    endTimeError.value = ''
    return
  }

  // Check if end time is after start time
  if (startTime && timeToMinutes(startTime) >= timeToMinutes(endTime)) {
    endTimeError.value = 'Giờ kết thúc phải sau giờ bắt đầu'
    return
  }

  // Check for overlap with other schedules
  const excludeId = props.editingSchedule?.id
  if (startTime && endTime) {
    for (const schedule of props.schedules) {
      if (excludeId && schedule.id === excludeId) continue

      if (hasOverlap(startTime, endTime, schedule.start_time, schedule.end_time)) {
        endTimeError.value = `Khung giờ trùng với ${schedule.start_time} - ${schedule.end_time}`
        return
      }
    }
  }

  endTimeError.value = ''
}

watch(
  () => localFormData.value.endTime,
  () => {
    validateEndTime()
  }
)

// ============================================
// COMPUTED PROPERTIES
// ============================================
const isFormValid = computed(() => {
  return (
    !startTimeError.value &&
    !endTimeError.value &&
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

const handleSave = () => {
  if (isFormValid.value) {
    emit('save', { ...localFormData.value })
  }
}
</script>

<style scoped>
/* Improved modal styling with better spacing and alignment */
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

/* Improved dialog header styling */
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

/* Better body padding */
:deep(.el-dialog__body) {
  padding: 1.5rem 2rem;
}

:deep(.el-dialog__footer) {
  padding: 1rem 2rem 1.5rem;
  border-top: 1px solid #f0f0f0;
}

/* Improved form item spacing */
:deep(.el-form-item) {
  margin-bottom: 1rem;
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
