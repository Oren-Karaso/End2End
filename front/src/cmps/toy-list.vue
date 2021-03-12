<template>
  <ul class="toy-list">
    <li
      class="clean-list toy-card"
      v-for="toy in filteredToys"
      :key="toy._id"
    >
      <toy-preview :toy="toy" class="preview"/>
      <div class="btns">
      <router-link :to="'/edit/'+toy._id" class="el-icon-edit"></router-link>
      <router-link :to="'/details/'+toy._id" class="el-icon-info"></router-link>
      <i @click="removeToy(toy._id)" class="el-icon-delete"></i>
      </div>
    </li>
  </ul>
</template>

<script>
import toyPreview from '../cmps/toy-preview.vue'


export default {
  name: 'toy-list',
  props: {
    filteredToys: {
      type: Array,
    }
  },
  methods: {
    removeToy(toyId) {
      this.$store.dispatch({ type: 'removeToy', toyId })

    },
  },
  components: {
    toyPreview,
  }
}
</script>

