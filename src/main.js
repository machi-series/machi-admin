import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import store from "./store";
import axios from "./axios";
import VueSwal from "vue-swal";
import gravatar from "gravatar";

Vue.use(VueSwal);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

Vue.filter("capitalize", function capitalize(data) {
  return data[0].toUpperCase() + data.slice(1);
});
Vue.filter("gravatar", function gravatarize(email, options) {
  return gravatar.url(email, options);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
