<template>
  <div class="toy-edit">
    <h1>Toy {{ title }}</h1>
    <h2>
      Toy's name: <span v-if="toy">{{ toy.name }}</span>
    </h2>
    <input type="text" v-model="toyToSave.name" />
    <h2>
      Toy's price <span v-if="toy">{{ toy.price }}</span>
    </h2>
    <input type="number" v-model="toyToSave.price" />
    <h2>
      Toy's type: <span v-if="toy">{{ toy.type }}</span>
    </h2>
    <select-input
      @value="updateType"
      :selections="[
        { value: 'puppets', label: 'Puppets' },
        { value: 'birthday', label: 'Birthday' },
      ]"
    />

    <h2>
      Is in-stock: <span v-if="toy">{{ toy.inStock }}</span>
    </h2>
    <select-input
      @value="updateStock"
      v-model="toyToSave.inStock"
      :selections="[
        { value: true, label: 'In Stock' },
        { value: false, label: 'Out of Stock' },
      ]"
    />
   
    <button @click="submitToy">{{ title }}</button>
  </div>
</template>

<script>
import { toyService } from "../services/toy.service.js";
import selectInput from "../cmps/select-input.vue";

export default {
  name: "toy-edit",
  data() {
    return {
      toy: null,
      toyToSave: null,
    };
  },
  methods: {
    submitToy() {
      this.$store
        .dispatch({ type: "saveToy", toy: this.toyToSave })
        .then(() => {
          this.$router.push("/");
          // showMsg('Toy Added', 'success')
        })
        .catch(() => {
          // showMsg('Cannot set toy', 'danger')
        });
    },
    updateType(typeToUpdate) {
      this.toyToSave.type = typeToUpdate;
    },
    updateStock(isInStockUpdate) {
      this.toyToSave.inStock = isInStockUpdate;
    },
  },
  computed: {
    title() {
      return this.toy ? "Edit" : "Add";
    },
  },
  created() {
    const toyId = this.$route.params.toyId;
    this.toy = this.$store.getters.toys.find((toy) => toy._id === toyId);

    this.toyToSave = this.toy
      ? JSON.parse(JSON.stringify(this.toy))
      : toyService.getEmptyToy();
  },
  components: {
    selectInput,
  },
};
</script>