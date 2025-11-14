<template>
  <div class="schedule-item">
    <div class="schedule-content">
      <el-tag type="primary" size="large" class="time-tag" effect="light">
        {{ schedule.start_time }} - {{ schedule.end_time }}
      </el-tag>

      <div class="task-info">
        <span class="task-description">{{ schedule.task }}</span>
        <span v-if="schedule.note" class="task-note">{{ schedule.note }}</span>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="action-buttons">
      <el-button
        type="primary"
        :icon="Edit"
        circle
        size="large"
        @click="$emit('edit', schedule)"
      />
      <el-button
        type="success"
        :icon="Plus"
        circle
        size="large"
        @click="$emit('add', schedule)"
      />
      <el-button
        type="danger"
        :icon="Delete"
        circle
        size="large"
        @click="$emit('delete', schedule.id)"
      />
    </div>
  </div>
</template>

<script setup>
import { Edit, Plus, Delete } from '@element-plus/icons-vue'

defineProps({
  schedule: {
    type: Object,
    required: true
  }
})

defineEmits(['edit', 'add', 'delete'])
</script>

<style scoped>
.schedule-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  transition: all 0.2s;
  background: white;
}

.schedule-item:hover {
  border-color: #667eea;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);
}

.schedule-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex: 1;
}

.time-tag {
  min-width: 140px;
  font-weight: 500;
}

.task-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.task-description {
  font-size: 0.9375rem;
  color: #1f2937;
  font-weight: 500;
}

.task-note {
  font-size: 0.8125rem;
  color: #6b7280;
  font-style: italic;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .schedule-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .schedule-content {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .action-buttons {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
