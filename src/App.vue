<script setup>

import { ref ,computed} from 'vue'





const msg = ref('Hello World! Main Component')


</script>

<template>
  <h1>{{ msg }}</h1>

<RouterLink to="/home">Home</RouterLink>
 <RouterLink to="/register">Register</RouterLink>

 <router-view />


</template>
