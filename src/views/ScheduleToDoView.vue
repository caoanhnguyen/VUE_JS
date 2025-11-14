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
      </div>

      <!-- Add New Button -->
      <el-button type="primary" size="large" class="add-new-btn" @click="startAddNew">
        <el-icon class="el-icon--left">
          <Plus />
        </el-icon>
        Add new task
      </el-button>
    </el-card>

    <!-- Moved modal outside of schedule-list for better structure -->
    <ScheduleModal
      v-model:visible="showScheduleModal"
      :is-editing="isEditing"
      :form-data="formData"
      :schedules="schedules"
      :editing-schedule="editingSchedule"
      @save="saveSchedule"
      @cancel="cancelEdit"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { Calendar, Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import ScheduleService from '@/services/ScheduleService.js'
import ScheduleItem from '@/components/ScheduleItem.vue'
import ScheduleModal from '@/components/ScheduleModal.vue'

// ============================================
// STATE MANAGEMENT
// ============================================
const showScheduleModal = ref(false)
const isEditing = ref(false)
const editingSchedule = ref(null)
const schedules = ref([])
const loading = ref(false)
const selectedDate = ref(new Date().toISOString().split('T')[0])
const schedulesCache = ref({})

const formData = ref({
  startTime: '',
  endTime: '',
  task: '',
  note: '',
})

// ============================================
// COMPUTED PROPERTIES
// ============================================
const scheduleCount = computed(() => schedules.value.length)

// ============================================
// DATA FETCHING
// ============================================
async function fetchSchedules(date) {
  if (!date) return

  // Check cache first
  if (schedulesCache.value[date]) {
    schedules.value = schedulesCache.value[date]
    return
  }

  loading.value = true
  schedules.value = []
  try {
    const data = await ScheduleService.getSchedulesByDate(date)
    schedules.value = data.data
    schedulesCache.value[date] = data.data
  } catch (error) {
    ElMessage.error('Failed to fetch schedules')
    console.error('Error fetching schedules:', error)
  } finally {
    loading.value = false
  }
}

// ============================================
// LIFECYCLE HOOKS
// ============================================
onMounted(() => {
  fetchSchedules(selectedDate.value)
})

watch(selectedDate, (newDate) => {
  fetchSchedules(newDate)
})

// ============================================
// MODAL OPERATIONS
// ============================================
const editSchedule = (schedule) => {
  isEditing.value = true
  showScheduleModal.value = true
  editingSchedule.value = schedule

  formData.value = {
    startTime: schedule.start_time,
    endTime: schedule.end_time,
    task: schedule.task,
    note: schedule.note || '',
  }
}

const startAdd = (schedule) => {
  isEditing.value = false
  showScheduleModal.value = true
  editingSchedule.value = null

  formData.value = {
    startTime: schedule.end_time,
    endTime: '',
    task: '',
    note: '',
  }
}

const startAddNew = () => {
  isEditing.value = false
  showScheduleModal.value = true
  editingSchedule.value = null

  formData.value = {
    startTime: '',
    endTime: '',
    task: '',
    note: '',
  }
}

const cancelEdit = () => {
  showScheduleModal.value = false
}

// ============================================
// CRUD OPERATIONS
// ============================================
const saveSchedule = async (data) => {
  loading.value = true
  try {
    if (isEditing.value && editingSchedule.value) {
      // Update existing schedule
      const payload = {
        task: data.task,
        note: data.note,
        start_time: data.startTime,
        end_time: data.endTime,
      }

      const res = await ScheduleService.updateSchedule(editingSchedule.value.id, payload)
      ElMessage.success(res.message || 'Schedule updated successfully')
    } else {
      // Create new schedule
      const payload = {
        task: data.task,
        note: data.note,
        start_time: data.startTime,
        end_time: data.endTime,
        schedule_date: selectedDate.value,
      }

      const res = await ScheduleService.createSchedule(payload)
      ElMessage.success(res.message || 'Schedule created successfully')
    }

    // Close modal and refresh data
    cancelEdit()
    delete schedulesCache.value[selectedDate.value]
    await fetchSchedules(selectedDate.value)
  } catch (error) {
    ElMessage.error(isEditing.value ? 'Failed to update schedule' : 'Failed to create schedule')
    console.error('Error saving schedule:', error)
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
    ElMessage.success(res.message || 'Schedule deleted successfully')

    // Refresh data
    delete schedulesCache.value[selectedDate.value]
    await fetchSchedules(selectedDate.value)
  } catch (error) {
    if (error === 'cancel') {
      ElMessage.info('Deletion cancelled')
    } else {
      ElMessage.error('Failed to delete schedule')
      console.error('Error deleting schedule:', error)
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
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
@media (max-width: 768px) {
  .app-container {
    padding: 1rem 0.5rem;
  }
  .date-picker-section {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
