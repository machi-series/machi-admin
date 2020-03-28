import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import store from "./store";
import axios from "./axios";
import VueSwal from "vue-swal";

Vue.use(VueSwal);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
