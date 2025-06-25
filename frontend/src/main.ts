import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueCompositionAPI from "@vue/composition-api";
import "@/assets/tailwind.css";
import "@fortawesome/fontawesome-free/css/all.css";

Vue.use(VueCompositionAPI);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
