<template>
  <div class="app-container">
    <div class="todo-card">
      <!-- Header -->
      <div class="header">
        <div class="header-content">
          <div class="icon-wrapper">
            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 11l3 3L22 4"></path>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
            </svg>
          </div>
          <div>
            <h1 class="title">My Todo List</h1>
            <p class="subtitle">Quản lý công việc hàng ngày</p>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="stats">
        <div class="stat-item">
          <span class="stat-label">Tổng số</span>
          <span class="stat-value">{{ todos.length }}</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-label">Hoàn thành</span>
          <span class="stat-value completed">{{ completedCount }}</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-label">Còn lại</span>
          <span class="stat-value pending">{{ pendingCount }}</span>
        </div>
      </div>

      <!-- Add Todo Form -->
      <form @submit.prevent="addTodo" class="add-form">
        <input
          v-model="newTodo"
          type="text"
          placeholder="Thêm công việc mới..."
          class="todo-input"
        />
        <button type="submit" class="add-button" :disabled="!newTodo.trim()">
          <svg class="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Thêm
        </button>
      </form>

      <!-- Todo List -->
      <div class="todo-list">
        <transition-group name="list">
          <div
            v-for="todo in todos"
            :key="todo.id"
            class="todo-item"
            :class="{ completed: todo.completed }"
          >
            <div class="todo-content">
              <button @click="toggleTodo(todo.id)" class="checkbox">
                <svg v-if="todo.completed" class="check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </button>
              <span class="todo-text">{{ todo.text }}</span>
            </div>
            <button @click="deleteTodo(todo.id)" class="delete-button">
              <svg class="delete-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </transition-group>

        <div v-if="todos.length === 0" class="empty-state">
          <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
          <p class="empty-text">Chưa có công việc nào</p>
          <p class="empty-subtext">Thêm công việc đầu tiên của bạn!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const newTodo = ref('')
const todos = ref([
  { id: 1, text: 'Học Vue.js cơ bản', completed: true },
  { id: 2, text: 'Làm dự án Todo List', completed: false },
  { id: 3, text: 'Thực hành Composition API', completed: false }
])

const completedCount = computed(() => todos.value.filter(t => t.completed).length)
const pendingCount = computed(() => todos.value.filter(t => !t.completed).length)

const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.value.push({
      id: Date.now(),
      text: newTodo.value.trim(),
      completed: false
    })
    newTodo.value = ''
  }
}

const toggleTodo = (id) => {
  const todo = todos.value.find(t => t.id === id)
  if (todo) {
    todo.completed = !todo.completed
  }
}

const deleteTodo = (id) => {
  todos.value = todos.value.filter(t => t.id !== id)
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.app-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 1rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.todo-card {
  max-width: 600px;
  margin: 0 auto;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

/* Header */
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  color: white;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.icon-wrapper {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon {
  width: 28px;
  height: 28px;
}

.title {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.2;
}

.subtitle {
  margin: 0.25rem 0 0 0;
  font-size: 0.875rem;
  opacity: 0.9;
}

/* Stats */
.stats {
  display: flex;
  padding: 1.5rem 2rem;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

.stat-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat-label {
  font-size: 0.75rem;
  color: #6c757d;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #495057;
}

.stat-value.completed {
  color: #10b981;
}

.stat-value.pending {
  color: #f59e0b;
}

.stat-divider {
  width: 1px;
  background: #dee2e6;
}

/* Add Form */
.add-form {
  padding: 1.5rem 2rem;
  display: flex;
  gap: 0.75rem;
  border-bottom: 1px solid #e9ecef;
}

.todo-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 0.9375rem;
  transition: all 0.2s;
  outline: none;
}

.todo-input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.add-button {
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9375rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
}

.add-button:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.add-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.button-icon {
  width: 18px;
  height: 18px;
}

/* Todo List */
.todo-list {
  padding: 1rem 2rem 2rem;
  max-height: 400px;
  overflow-y: auto;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  transition: all 0.2s;
}

.todo-item:hover {
  background: #e9ecef;
  transform: translateX(4px);
}

.todo-item.completed {
  opacity: 0.6;
}

.todo-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.checkbox {
  width: 24px;
  height: 24px;
  border: 2px solid #dee2e6;
  border-radius: 6px;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
  padding: 0;
}

.todo-item.completed .checkbox {
  background: #10b981;
  border-color: #10b981;
}

.check-icon {
  width: 16px;
  height: 16px;
  color: white;
}

.todo-text {
  font-size: 0.9375rem;
  color: #212529;
  line-height: 1.5;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
}

.delete-button {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  color: #dc3545;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  padding: 0;
}

.delete-button:hover {
  background: #fee;
}

.delete-icon {
  width: 18px;
  height: 18px;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
}

.empty-icon {
  width: 64px;
  height: 64px;
  color: #dee2e6;
  margin: 0 auto 1rem;
}

.empty-text {
  font-size: 1.125rem;
  font-weight: 600;
  color: #495057;
  margin: 0 0 0.5rem 0;
}

.empty-subtext {
  font-size: 0.875rem;
  color: #6c757d;
  margin: 0;
}

/* Animations */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.list-move {
  transition: transform 0.3s ease;
}

/* Responsive */
@media (max-width: 1400px) {
  .app-container {
    padding: 1rem 0.5rem;
  }

  .header {
    padding: 1.5rem;
  }

  .title {
    font-size: 1.5rem;
  }

  .stats {
    padding: 1rem 1.5rem;
  }

  .add-form {
    padding: 1rem 1.5rem;
    flex-direction: column;
  }

  .todo-list {
    padding: 1rem 1.5rem 1.5rem;
  }

  .add-button {
    width: 100%;
    justify-content: center;
  }
}
</style>
