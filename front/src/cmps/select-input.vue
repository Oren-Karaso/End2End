<template>
  <el-select @change="selecting" v-model="value" clearable placeholder="Select">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    >
    </el-option>
  </el-select>
</template>

<script>
export default {
  props: ["selections"],
  // name: "select-input",
  data() {
    return {
      options: null,
      value: "",
    };
  },
  methods: {
    selecting() {
      this.$emit('value', this.value);
    },
  },
  created() {
    this.options = this.selections;
    console.log("selects:", this.options);
  },
};
</script>