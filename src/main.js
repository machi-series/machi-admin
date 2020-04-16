import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import store from "./store";
import axios from "./axios";
import VueSwal from "vue-swal";
import VueCodemirror from "vue-codemirror";
import VueMoment from "vue-moment";
import moment from "moment";
import "moment/locale/pt-br";
import "codemirror/lib/codemirror.css";

Vue.use(VueSwal);
Vue.use(BootstrapVue);
Vue.use(VueMoment, { moment });
Vue.use(VueCodemirror);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

Vue.filter("capitalize", function capitalize(data) {
  return data[0].toUpperCase() + data.slice(1);
});
Vue.filter("image", function capitalize(name) {
  return process.env.VUE_APP_BASE_URL + "/images/" + name;
});
Vue.filter("avatar", function capitalize(user) {
  if (!user.avatar) {
    return "https://www.gravatar.com/avatar/e64c7d89f26bd1972efa854d13d7dd61%3Fs=200";
  }
  const name = user.avatar.originalName;
  return process.env.VUE_APP_BASE_URL + "/images/" + name;
});
Vue.filter("translateRole", function capitalize(role) {
  return {
    user: "Usuário comum",
    publisher: "Publicador",
    manager: "Gerente",
    admin: "Administrador"
  }[role];
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
