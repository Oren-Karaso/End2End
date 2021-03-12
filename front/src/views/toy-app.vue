<template>
  <section class="toy-app">
    <div class="headers">
      <h1>Welcome to the toy-store</h1>
      <toy-filter @searchBy="searchBy" @setFilter="setFilter" />
      <router-link
        to="/edit/"
        class="el-icon-circle-plus-outline"
      ></router-link>
    </div>
    <toy-list :filteredToys="filteredToys" />
  </section>
</template>

<script>
// @ is an alias to /src
import toyList from "../cmps/toy-list.vue";
import toyFilter from "../cmps/toy-filter.vue";
// import { showMsg } from '../services/eventBus.service.js';

export default {
  name: "Toy-App",
  methods: {
    setFilter(filterBy) {
      this.$store.commit({ type: "setFilter", filterBy });
      this.$store.dispatch({ type: "loadToys", filterBy });
      // console.log(filterBy);
    },
    searchBy(searchBy) {
      // this.$store.commit({ type: 'searchBy', searchBy });
      // console.log(searchBy);
    },
  },
  computed: {
    filteredToys() {
      return this.$store.getters.filteredToys;
    },
  },
  components: {
    toyList,
    toyFilter,
  },
};
</script>
