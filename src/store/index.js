import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import * as auth from "./auth";

const persistence = new VuexPersistence({
  storage: window.localStorage
});

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { auth },
  plugins: [persistence.plugin]
});

export default store;

setInterval(() => {
  const isLoggedIn = store.getters["auth/isLoggedIn"];
  if (isLoggedIn && store.dispatch) {
    store.dispatch("auth/checkCredentials").catch(() => {});
  }
}, 10000);
