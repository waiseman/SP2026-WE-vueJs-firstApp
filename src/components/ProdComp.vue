<script setup>



defineProps(['title','price'])
const emit =defineEmits(['purchased','canceled'])


function BuyButtonClick(title)
{
  emit('purchased',title);
}

</script>

<template>
  <div class="box">
    <h1>{{title}}</h1>
    <h2>Price : {{price}}</h2>
    <p>We have very good Product its very durable</p>
    <button @click="BuyButtonClick(title)">Buy Now</button>
    <button @click="emit('canceled',title)">Cancel</button>    
  </div>
</template>


<style>
.box {
border: 2px solid black;
border-radius: 10px;
padding: 20px;
margin: 10px;
}

</style>