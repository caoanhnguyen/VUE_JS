<template>
  <div class="app-container">
    <el-card class="schedule-card" shadow="always">
      <!-- Header -->
      <template #header>
        <div class="header-content">
          <el-icon :size="50" class="header-icon">
            <Calendar />
          </el-icon>
          <div>
            <h1 class="title">My Schedule</h1>
            <p class="subtitle">Manage your schedules</p>
          </div>
        </div>
      </template>

      <!-- Date picker -->
      <div class="date-picker-section">
        <el-date-picker
          v-model="selectedDate"
          type="date"
          placeholder="Chọn ngày"
          format="DD/MM/YYYY"
          value-format="YYYY-MM-DD"
          size="large"
          :clearable="false"
        />
        <el-tag type="primary" size="large" effect="light"> {{ scheduleCount }} tasks </el-tag>
      </div>

      <!-- Schedule List -->
      <div class="schedule-list" v-loading="loading">
        <ScheduleItem
          v-for="schedule in schedules"
          :key="schedule.id"
          :schedule="schedule"
          @edit="editSchedule"
          @add="startAdd"
          @delete="deleteSchedule"
        />

        <!-- Empty State -->
        <el-empty
          v-if="schedules.length === 0 && !loading"
          description="You have no tasks for this date."
        >
          <template #image>
            <el-icon :size="64" color="#d1d5db">
              <Calendar />
            </el-icon>
          </template>
        </el-empty>


        <!-- Schedule Modal -->
        <el-dialog
          v-model="showScheduleModal"
          :title="isEditing ? 'Edit Task' : 'Add New Task'"
          width="600px"
          :close-on-click-modal="false"
          @close="cancelEdit"
          class="schedule-modal"
        >
          <el-form :model="formData" label-position="top" class="modal-form">
            <div class="form-grid">
              <el-form-item
                label="Start Time"
                class="form-field"
                :error="startTimeError"
                :validate-status="startTimeError ? 'error' : ''"
              >
                <el-time-select
                  v-model="formData.startTime"
                  :start="'00:00'"
                  :step="'00:15'"
                  :end="'23:45'"
                  placeholder="Choose start time"
                  format="HH:mm"
                  value-format="HH:mm"
                  size="large"
                  :prefix-icon="Clock"
                />
              </el-form-item>

              <el-form-item
                label="End Time"
                class="form-field"
                :error="endTimeError"
                :validate-status="endTimeError ? 'error' : ''"
              >
                <el-time-select
                  v-model="formData.endTime"
                  :start="'00:00'"
                  :step="'00:15'"
                  :end="'23:45'"
                  placeholder="Choose end time"
                  format="HH:mm"
                  value-format="HH:mm"
                  size="large"
                  :prefix-icon="Clock"
                />
              </el-form-item>
            </div>

            <el-form-item label="Task" class="form-field">
              <el-input
                v-model="formData.task"
                placeholder="Enter task description"
                maxlength="100"
                show-word-limit
                clearable
                size="large"
              />
            </el-form-item>

            <el-form-item label="Notes (Optional)" class="form-field">
              <el-input
                v-model="formData.note"
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
              <el-button
                size="large"
                @click="cancelEdit"
              >
                Cancel
              </el-button>
              <el-button
                type="primary"
                size="large"
                @click="saveSchedule"
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
      </div>

      <!-- Add New Button -->
      <el-button
        type="primary"
        size="large"
        class="add-new-btn"
        @click="startAddNew"
      >
        <el-icon class="el-icon--left">
          <Plus />
        </el-icon>
        Add new task
      </el-button>
    </el-card>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { Calendar, Plus, Check, Clock } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import ScheduleService from '@/services/ScheduleService.js'
import ScheduleItem from '@/components/ScheduleItem.vue'

// State variables
const showScheduleModal = ref(false)
const isEditing = ref(false)
const schedules = ref([])
const loading = ref(false)
const selectedDate = ref(new Date().toISOString().split('T')[0])
const editingSchedule = ref(null)
const addingAfter = ref(null)
const schedulesCache = ref({})

const formData = ref({
  startTime: '',
  endTime: '',
  task: '',
  note: '',
})
const errorMessage = ref('')
const startTimeError = ref('')
const endTimeError = ref('')

const scheduleCount = computed(() => {
  return schedules.value.length
})

async function fetchSchedules(date) {

  if (!date) return

  // Nếu đã cache rồi thì lấy ra luôn
  if (schedulesCache.value[date]) {
    schedules.value = schedulesCache.value[date]
    console.log(schedulesCache.value)
    return
  }

  loading.value = true
  schedules.value = []
  try {
    const data = await ScheduleService.getSchedulesByDate(date)
    schedules.value = data.data
    // Cache lại kết quả
    schedulesCache.value[date] = data.data
    console.log(schedulesCache.value)
  } catch (error) {
    console.error('Error occur:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchSchedules(selectedDate.value)
})

watch(selectedDate, (newDate) => {
  fetchSchedules(newDate)
})

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

watch(
  () => formData.value.startTime,
  (newStartTime) => {
    if (!newStartTime) {
      startTimeError.value = ''
      return
    }
    const excludeId = editingSchedule.value?.id
    for (const schedule of schedules.value) {
      if (excludeId && schedule.id === excludeId) continue

      const newStart = timeToMinutes(newStartTime)
      const scheduleStart = timeToMinutes(schedule.start_time)
      const scheduleEnd = timeToMinutes(schedule.end_time)

      if (newStart >= scheduleStart && newStart < scheduleEnd) {
        startTimeError.value = `Giờ bắt đầu trùng với khung giờ ${schedule.start_time} - ${schedule.end_time}`
        return
      }
    }
    startTimeError.value = ''
    if (formData.value.endTime) {
      validateEndTime()
    }
  },
)

const validateEndTime = () => {
  const { startTime, endTime } = formData.value
  if (!endTime) {
    endTimeError.value = ''
    return
  }
  if (startTime && timeToMinutes(startTime) >= timeToMinutes(endTime)) {
    endTimeError.value = 'Giờ kết thúc phải sau giờ bắt đầu'
    return
  }
  const excludeId = editingSchedule.value?.id
  if (startTime && endTime) {
    for (const schedule of schedules.value) {
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
  () => formData.value.endTime,
  () => {
    validateEndTime()
  },
)

const isFormValid = computed(() => {
  return (
    !startTimeError.value &&
    !endTimeError.value &&
    formData.value.startTime &&
    formData.value.endTime &&
    formData.value.task &&
    formData.value.task.trim() !== ''
  )
})

const editSchedule = (schedule) => {
  isEditing.value = true
  showScheduleModal.value = true
  editingSchedule.value = schedule
  addingAfter.value = null

  formData.value = {
    startTime: schedule.start_time,
    endTime: schedule.end_time,
    task: schedule.task,
    note: schedule.note || '',
  }

  errorMessage.value = ''
  startTimeError.value = ''
  endTimeError.value = ''
}

const startAdd = (schedule) => {
  isEditing.value = false
  showScheduleModal.value = true
  addingAfter.value = schedule
  editingSchedule.value = null
  formData.value = {
    startTime: schedule.end_time,
    endTime: '',
    task: '',
    note: '',
  }
  errorMessage.value = ''
  startTimeError.value = ''
  endTimeError.value = ''
}

const startAddNew = () => {
  isEditing.value = false
  showScheduleModal.value = true
  editingSchedule.value = null
  addingAfter.value = true
  formData.value = {
    startTime: '',
    endTime: '',
    task: '',
    note: '',
  }
  errorMessage.value = ''
  startTimeError.value = ''
  endTimeError.value = ''
}

const cancelEdit = () => {
  isEditing.value = false
  showScheduleModal.value = false
  editingSchedule.value = null
  addingAfter.value = null
  formData.value = {
    startTime: '',
    endTime: '',
    task: '',
    note: '',
  }
  errorMessage.value = ''
  startTimeError.value = ''
  endTimeError.value = ''
}

const saveSchedule = async () => {
  if (!isFormValid.value) {
    errorMessage.value =
      startTimeError.value || endTimeError.value || 'Please fill in all required fields correctly.'
    ElMessage.warning(errorMessage.value)
    return
  }
  loading.value = true
  try {
    // UPDATE
    if (editingSchedule.value) {
      const payload = {
        task: formData.value.task,
        note: formData.value.note,
        start_time: formData.value.startTime,
        end_time: formData.value.endTime,
      }

      console.log('Update payload: ', payload)

      const res = await ScheduleService.updateSchedule(editingSchedule.value.id, payload)
      console.log(res)
      ElMessage.success(res.message)
    } else {
      // CREATE
      const payload = {
        task: formData.value.task,
        note: formData.value.note,
        start_time: formData.value.startTime,
        end_time: formData.value.endTime,
        schedule_date: selectedDate.value,
      }

      console.log('Create payload: ', payload)

      const res = await ScheduleService.createSchedule(payload)
      ElMessage.success(res.message)
    }

    cancelEdit()
    schedulesCache.value[selectedDate.value] = undefined // xóa cache ngày hiện tại
    await fetchSchedules(selectedDate.value)
  } catch (error) {
    console.error('Error occur:', error)
  } finally {
    loading.value = false
  }
}

const deleteSchedule = async (id) => {
  try {
    await ElMessageBox.confirm(
      'Are you sure you want to delete this schedule?',
      'Confirm Deletion',
      {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning',
      },
    )

    loading.value = true
    const res = await ScheduleService.deleteSchedule(id)
    ElMessage.success(res.message)
    schedulesCache.value[selectedDate.value] = undefined // xóa cache ngày hiện tại
    await fetchSchedules(selectedDate.value)
  } catch (error) {
    if (error === 'cancel') {
      ElMessage.info('Canceled deletion.')
    } else {
      console.error('Error occur:', error)
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Removed schedule-item related styles as they moved to ScheduleItem component */
.app-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 1rem;
}
.schedule-card {
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 16px;
}
:deep(.el-card__header) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
}
.header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.header-icon {
  color: white;
}
.title {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.2;
  color: white;
}
.subtitle {
  margin: 0.25rem 0 0 0;
  font-size: 0.875rem;
  opacity: 0.9;
  color: white;
}
.date-picker-section {
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}
.schedule-list {
  padding: 0.5rem;
  max-height: 480px;
  overflow-y: auto;
}
.add-new-btn {
  width: 100%;
  margin-top: 1rem;
  height: 48px;
  font-size: 1rem;
  font-weight: 600;
}
:deep(.el-button--primary) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
}
:deep(.el-button--primary:hover) {
  background: linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%);
}
.error {
  color: red;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
@media (max-width: 768px) {
  .app-container {
    padding: 1rem 0.5rem;
  }
  .date-picker-section {
    flex-direction: column;
    align-items: stretch;
  }
  .form-row {
    flex-direction: column;
    align-items: stretch;
  }
  .time-item,
  .task-item {
    min-width: 100%;
  }
  .separator {
    display: none;
  }
}
/* </CHANGE> */
</style>
