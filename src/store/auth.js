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
  isLoggedIn({ token, user }) {
    return !!token && !!user;
  },

  currentUser({ user }) {
    return user;
  },

  isAdmin({ user }) {
    return user && user.role === "admin";
  },

  isManager({ user }) {
    return user && ["admin", "manager"].includes(user.role);
  },

  isSpy({ user }) {
    return user && user.role === "user";
  }
};

export const actions = {
  login({ commit }, { email, password }) {
    return axios
      .post("/login", { email, password })
      .then(async ({ data: { token } }) => {
        commit("setToken", token);
        const { data: user } = await axios.get("/me");
        if (user.role === "user") {
          commit("setToken", false);
        }
        commit("setUser", user);
        return user;
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
