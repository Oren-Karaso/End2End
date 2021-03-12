<template>
  <div class="main-layout">
    <nav class="navbar">
      <img src="./assets/img/navbarLogo.png" />
      <div class="nav-links">
        <router-link to="/">Home</router-link> |
        <router-link to="/dashboard/">Charts</router-link>
      </div>
    </nav>
    <!-- <user-message/> -->
    <img v-if="isLoading" src="./assets/img/puff.svg" />
    <router-view />
    <footer class="footer">WTF2021</footer>
  </div>
</template>

<script>
// import userMsg from './cmps/user-msg.vue'

export default {
  data() {
    return {};
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
  created() {
    this.$store.dispatch({ type: "loadToys" });
  },
  components: {
    // userMsg,
  },
};
</script>

