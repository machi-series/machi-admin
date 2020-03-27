import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import * as auth from "./auth";

const persistence = new VuexPersistence({
  storage: window.localStorage
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { auth },
  plugins: [persistence.plugin]
});
