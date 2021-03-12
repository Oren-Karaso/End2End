<template v-if="toy">
      <div class="toy-details">
        <h1>Toy Details</h1>
        <h2>{{toy}}</h2>
      </div>
</template>

<script>

export default {
  name: 'toy-details',
  data() {
    return {
      toy: null,
    }
  },
  computed: {
   
  },
  created(){
		const toyId = this.$route.params.toyId;
    this.toy = this.$store.getters.toys.find(
			(toy) => toy._id === toyId);  
    }
    
}
</script>