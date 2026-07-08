<script setup>

import { ref, onMounted } from 'vue'
import { api } from '@/api/axios'

// The 3 states EVERY API call needs
const users   = ref([])    // success state
const loading = ref(false) // loading state
const error   = ref(null)  // error state

async function loadUsers() {
  loading.value = true
  error.value   = null
  try {
    const res   = await api.get('http://localhost:3000/api/users')
    //console.log(res.data)
    users.value = res.data
  } catch (err) {
    error.value = err.response?.data?.message
                  ?? 'Something went wrong'
  } finally {
    loading.value = false  // always runs
  }
}

// UPDATE — PUT
async function updateUser(id, changes) {
  const res    = await api.put(`http://localhost:3000/api/users/${id}`, changes)
  const index  = users.value.findIndex(u => u._id === id)
  users.value[index] = res.data  // update in local array
}

// DELETE — DELETE
async function deleteUser(id) {
  await api.delete(`http://localhost:3000/api/users/${id}`)
  users.value = users.value.filter(u => u._id !== id)
}





onMounted(loadUsers)
</script>

<template>
  <!-- Loading state -->
  <div v-if="loading">
    <p>Loading users...</p>
  </div>

  <!-- Error state -->
  <div v-else-if="error">
    <p>Error: {{ error }}</p>
    <button @click="loadUsers">
      Try again
    </button>
  </div>

  <!-- Success state -->
  <ul v-else>
    <li v-for="u in users" :key="u.id">
      {{ u.name }} : Age {{ u.age }}
    </li>
  </ul>
</template>
