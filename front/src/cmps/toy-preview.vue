<template>
<div>
  <p>Name: {{toy.name}}</p>
  <p>Price: {{toy.price}}</p>
  <p>Availability: {{toy.inStock}}</p>
</div>
</template>

<script>
export default {
  name: 'toy-preview',
  props: {
    toy:{
      type: Object,
    }    
  }
}
</script>

