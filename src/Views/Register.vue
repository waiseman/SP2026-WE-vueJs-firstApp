<script setup>
import { reactive, ref } from 'vue'
import { api } from '@/api/axios'

// All form fields in one reactive object
const form = reactive({
  name: '',
  email: '',
  password: '',
  role: 'user',
  agreed: false,
})

// Separate errors object
const errors = reactive({})
const loading = ref(false)
const success = ref(false)

async function handleSubmit() {
  if (!form.name.trim()) {
    alert('Name is required')
    return
  }

  loading.value = true
  try {
    await api.post('http://localhost:3000/api/users', form)
    success.value = true
  } catch {
    alert('Error while posting data')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="register-card">
    <h1>Register</h1>

    <div class="field">
      <label>Full name</label>
      <input v-model="form.name" placeholder="Full name" />
    </div>

    <div class="field">
      <label>Email</label>
      <input v-model="form.email" type="email" placeholder="Email" />
    </div>

    <div class="field">
      <label>Password</label>
      <input v-model="form.password" type="password" placeholder="Password" />
    </div>

    <div class="field">
      <label>Role</label>
      <select v-model="form.role">
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
    </div>

    <label class="checkbox-field">
      <input v-model="form.agreed" type="checkbox" />
      I agree to the terms
    </label>

    <button class="submit-btn" :disabled="loading" @click="handleSubmit">
      {{ loading ? 'Saving...' : 'Register' }}
    </button>

    <p v-if="success" class="success-msg">Registered successfully!</p>
  </div>
</template>

<style scoped>
.register-card {
  max-width: 380px;
  margin: 3rem auto;
  padding: 2rem;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  font-family: system-ui, sans-serif;
}

.register-card h1 {
  margin: 0 0 1.5rem;
  font-size: 1.5rem;
  color: #1f2937;
  text-align: center;
}

.field {
  margin-bottom: 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.field label {
  font-size: 0.85rem;
  color: #374151;
  font-weight: 500;
}

.field input,
.field select {
  padding: 0.6rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.15s ease;
}

.field input:focus,
.field select:focus {
  border-color: #6366f1;
}

.checkbox-field {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: #374151;
  margin-bottom: 1.5rem;
}

.submit-btn {
  width: 100%;
  padding: 0.7rem;
  border: none;
  border-radius: 8px;
  background: #6366f1;
  color: #fff;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease;
}

.submit-btn:hover:not(:disabled) {
  background: #4f46e5;
}

.submit-btn:disabled {
  background: #a5b4fc;
  cursor: not-allowed;
}

.success-msg {
  margin-top: 1rem;
  text-align: center;
  color: #16a34a;
  font-size: 0.9rem;
}
</style>
