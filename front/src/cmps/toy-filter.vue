<template>
  <section class="toy-filter">
    <label class="search-input">
      Search for a toy:
      <input
        type="text"
        placeholder="Search for?"
        v-model="filterBy.txt"
        @input="debounceSearch"
      />
    </label>

    <div class="filter-inputs full">
      <label>
        Filter by type:
        <select @change="setFilter" v-model="filterBy.type">
          <option value="all">All</option>
          <option value="puppets">Puppets</option>
          <option value="birthday">Birthday</option>
        </select>
      </label>

      <label>
        Check availability:
        <select @change="setFilter" v-model="filterBy.inStock">
          <option value="all">All</option>
          <option value="true">In Stock</option>
          <option value="false">Out of Stock</option>
        </select>
      </label>

      <label for="price"
        >Price:
        <input
          @change="setFilter"
          type="range"
          id="price"
          min="0"
          max="200"
          v-model="filterBy.price"
        />
      </label>
    </div>
  </section>
</template>

<script>
export default {
  name: "toy-preview",
  props: {},
  data() {
    return {
      maxPrice: 200,
      filterBy: {
        inStock: "all",
        txt: "",
        price: 200,
        type: "all",
      },
    };
  },
  methods: {
    setFilter() {
      this.$emit("setFilter", { ...this.filterBy });
    },
    debounceSearch(ev) {
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        this.$emit("setFilter", { ...this.filterBy });
      }, 500);
    },
  },
  // computed: {
  //   maxPrice() {
  //     // const toys = this.$store.getters.toys
  //     // return toys.
  //     return 200
  //   }
  // },
  created() {
    this.setFilter();
  },
};
</script>

