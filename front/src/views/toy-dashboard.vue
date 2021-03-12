<template>
  <section class="charts">
    <h1>Dasboards:</h1>
    <toy-type-chart :toyTypes="toyTypes" :toyPrices="toyPrices" />
  </section>
</template>

<script>
import toyTypeChart from "@/cmps/toy-type-chart";
export default {
  name: "dasboard",
  data() {
    return {
      toyTypes: [],
      toyPrices: [],
    };
  },

  created() {
    const toys = this.$store.getters.toys;
    const toyTypes = toys.reduce((typesMap, toy) => {
      if (typesMap[toy.type]) {
        typesMap[toy.type]++;
      } else typesMap[toy.type] = 1;
      return typesMap;
    }, {});

    for (const type in toyTypes) {
      this.toyTypes.push(type);
      this.toyPrices.push(toyTypes[type]);
    }
  
  },

  components: {
    toyTypeChart,
  },
};
</script>

<style>
</style>