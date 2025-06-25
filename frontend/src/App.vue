<template>
  <div id="app">
    <nav class="px-6 py-4 bg-gray-100 border-b border-gray-300">
      <div class="space-x-4 formatter-flex">
        <div>
          <router-link
            to="/"
            class="margin-right-5 font-semibold text-gray-700 hover:text-blue-600"
            >Home</router-link
          >
          <router-link
            to="/about"
            class="margin-right-5 font-semibold text-gray-700 hover:text-blue-600"
            >About</router-link
          >
        </div>

        <!-- Botão de Sair visível apenas se logado -->
        <div v-if="userLogged">
          <button
            @click="logout"
            class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200"
          >
            Sair
          </button>
        </div>
      </div>
    </nav>

    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",
  data() {
    return {
      userLogged: !!localStorage.getItem("user"),
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("user");
      this.userLogged = false;
      this.$router.push("/");
    },
  },
  watch: {
    // Reavalia o login a cada troca de rota (útil após login)
    $route() {
      this.userLogged = !!localStorage.getItem("user");
    },
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

.margin-right-5 {
  margin-right: 5px;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.formatter-flex {
  display: flex;
  justify-content: space-between;
}
</style>
