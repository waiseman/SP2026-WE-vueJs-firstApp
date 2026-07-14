<script setup>
import { ref, onMounted } from 'vue'
import { api } from '@/api/axios'

// The 3 states EVERY API call needs
const users = ref([])      // success state
const loading = ref(false) // loading state
const error = ref(null)    // error state

async function loadUsers() {
  loading.value = true
  error.value = null
  try {
    const res = await api.get('http://localhost:3000/api/users')
    users.value = res.data
  } catch (err) {
    error.value = err.response?.data?.message ?? 'Something went wrong'
  } finally {
    loading.value = false // always runs
  }
}

// UPDATE — PUT
async function updateUser(id, changes) {
  const res = await api.put(`http://localhost:3000/api/users/${id}`, changes)
  const index = users.value.findIndex(u => u._id === id)
  users.value[index] = res.data // update in local array
}

// DELETE — DELETE
async function deleteUser(id) {
  await api.delete(`http://localhost:3000/api/users/${id}`)
  users.value = users.value.filter(u => u._id !== id)
}

onMounted(loadUsers)
</script>

<template>
  <div class="users-card">
    <h1>Users</h1>

    <!-- Loading state -->
    <div v-if="loading" class="state-msg">
      <p>Loading users...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="state-msg error">
      <p>Error: {{ error }}</p>
      <button class="retry-btn" @click="loadUsers">Try again</button>
    </div>

    <!-- Success state -->
    <ul v-else class="user-list">
      <li v-for="u in users" :key="u._id" class="user-row">
        <div class="user-info">
          <span class="user-name">{{ u.name }}</span>
          <span class="user-email">{{ u.email }}</span>
        </div>
        <span class="user-role" :class="u.role">{{ u.role }}</span>
        <button class="delete-btn" @click="deleteUser(u._id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.users-card {
  max-width: 480px;
  margin: 3rem auto;
  padding: 2rem;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  font-family: system-ui, sans-serif;
}

.users-card h1 {
  margin: 0 0 1.5rem;
  font-size: 1.5rem;
  color: #1f2937;
  text-align: center;
}

.state-msg {
  text-align: center;
  color: #6b7280;
  padding: 1.5rem 0;
}

.state-msg.error {
  color: #dc2626;
}

.retry-btn {
  margin-top: 0.75rem;
  padding: 0.4rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
}

.user-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.user-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.user-name {
  font-weight: 600;
  color: #1f2937;
}

.user-email {
  font-size: 0.8rem;
  color: #6b7280;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-role {
  flex-shrink: 0;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  background: #e0e7ff;
  color: #4338ca;
  text-transform: capitalize;
}

.user-role.admin {
  background: #fee2e2;
  color: #b91c1c;
}

.delete-btn {
  flex-shrink: 0;
  padding: 0.35rem 0.75rem;
  border: none;
  border-radius: 8px;
  background: #fef2f2;
  color: #dc2626;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease;
}

.delete-btn:hover {
  background: #fee2e2;
}
</style>
