import { boot } from "quasar/wrappers";
import axios from "axios";
import router from "../router";

// Crear una instancia de axios con la configuración base
const api = axios.create({ baseURL: "https://localhost:44384/api" });

// Interceptor para agregar el token a cada solicitud
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      router.push("/");
    }
    return Promise.reject(error);
  }
);

export default boot(({ app }) => {
  // Permite el uso de axios dentro de los archivos Vue (Options API) a través de this.$axios y this.$api
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };
