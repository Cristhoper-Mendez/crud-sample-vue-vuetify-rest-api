import Vue from "vue";
import Vuex from "vuex";

import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token-cotizacion") | "",
    login: "",
  },
  mutations: {
    getUser(state, payload) {
      state.token = payload.token;
      if (payload.token === "") {
        state.token = "";
      } else {
        state.token = payload.token;
        state.login = payload.login;
      }
    },
  },
  actions: {
    saveUser({ commit }, payload) {
      localStorage.setItem("token-cotizacion", payload.token);
      localStorage.setItem("login-cotizacion", payload.login);
      commit("getUser", payload);
    },
    logout({ commit }) {
      commit("getUser", "");
      localStorage.removeItem("token-cotizacion");
      localStorage.removeItem("login-cotizacion");
      router.push({ name: "Login" });
    },
    readToken({ commit }) {
      const token = localStorage.getItem("token-cotizacion");
      const login = localStorage.getItem("login-cotizacion");

      const obj = {
        login: login,
        token: token,
      };

      if (token) {
        commit("getUser", obj);
      } else {
        commit("getUser", "");
      }
    },
  },
  modules: {},
  getters: {
    isActive: (state) => !!state.token,
  },
});
