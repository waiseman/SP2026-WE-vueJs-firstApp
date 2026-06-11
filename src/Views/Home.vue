<script setup>
import { ref ,computed} from 'vue'

import ProdComp from '../components/ProdComp.vue';



function AddToCart(title)
{

alert("Product Added To Cart :" +title);

}

function RemoveFromCart(title)
{
  alert("Product Removed From Cart :" +title);
}

const products = ref([
{id:1, Title:'T shirt', Price:'$9'},
{id:1, Title:'Trouser', Price:'$10'},
{id:1, Title:'Shorts', Price:'$4'},
{id:1, Title:'Tops', Price:'$4'},
])

</script>


<template>
<h1>Home Page</h1>

<ProdComp v-for="prod in products"
:key="prod.id"
 :title="prod.Title" , :price="prod.Price"
 
 @purchased="AddToCart"
 @canceled="RemoveFromCart"
 />


</template>
