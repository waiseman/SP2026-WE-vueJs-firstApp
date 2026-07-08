<script setup>
import { reactive, ref } from 'vue'
import { api } from '@/api/axios'


// All form fields in one reactive object
const form = reactive({
  name:     '',
  email:    '',
  password: '',
  role:     'user',
  agreed:   false,
})
// Separate errors object
const errors  = reactive({})
const loading = ref(false)
const success = ref(false)
async function handleSubmit() {

    if (!form.name.trim())
    alert('Name is required'
)
else 
{
       try{
     const  res = await api.post('http://localhost:3000/api/users',form);

       }catch{
              alert('Error while posting data');
       }}

}
</script>
<template>

{{ form }}
<hr>
  <input v-model="form.name"
         placeholder="Full name" />

  <input v-model="form.email"
         type="email"
         placeholder="Email" />

  <input v-model="form.password"
         type="password" />

  <select v-model="form.role">
    <option value="user">User</option>
    <option value="admin">Admin</option>
  </select>

  <input v-model="form.agreed"
         type="checkbox" />

         <button
  :disabled="loading"
  @click="handleSubmit">
  {{ loading ? 'Saving...' : 'Register' }}
</button>

</template>