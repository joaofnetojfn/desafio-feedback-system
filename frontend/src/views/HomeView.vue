<template>
  <div class="home">
    <Login />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import Login from "@/components/Login.vue"; // @ is an alias to /src

export default Vue.extend({
  name: "HomeView",
  components: {
    Login,
  },
});
</script>
