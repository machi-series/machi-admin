import axios from "../axios";

export const namespaced = true;

export const state = {
  token: false,
  user: false
};

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },

  setToken(state, token) {
    state.token = token;
  }
};

export const getters = {
  isLoggedIn({ token }) {
    return !!token;
  },

  currentUser({ user }) {
    return user;
  },

  isAdmin({ user }) {
    return user && user.role === "admin";
  }
};

export const actions = {
  login({ commit }, { email, password }) {
    return axios
      .post("/login", { email, password })
      .then(async ({ data: { token } }) => {
        commit("setToken", token);
        const user = await axios.get("/me");
        commit("setUser", user);
      });
  },

  register({ dispatch }, { email, name, password }) {
    return axios.post("/users", { email, name, password }).then(() => {
      return dispatch("login", { email, password });
    });
  },

  logout({ commit }) {
    commit("setToken", false);
    commit("setUser", false);
  }
};
