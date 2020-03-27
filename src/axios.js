import axios from "axios";
import store from "./store";

const instance = axios.create({
  baseURL: "http://localhost:3333"
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
