import axios from "axios";
import store from "./store";

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL
  // timeout: 10000
  // transformResponse({ data }) {
  //   debugger;
  //   return data;
  // }
});

instance.interceptors.request.use(function(config) {
  const token = store.state.auth.token;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
