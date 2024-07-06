<template>
  <div class="q-pa-md flex flex-center container">
    <q-card square bordered class="q-pa-lg shadow-1" style="width: 500px">
      <q-card-section>
        <div class="text-h6">Iniciar Sesión</div>
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input
            square
            filled
            clearable
            v-model="email"
            type="email"
            label="Email"
            required
          />
          <q-input
            square
            filled
            clearable
            v-model="password"
            type="password"
            label="Password"
            required
          />
          <q-btn
            type="button"
            label="Iniciar Sesión"
            color="primary"
            class="full-width"
            @click="iniciarSesion"
          />
          <br />
          <q-btn
            type="button"
            label="Crear Usuario"
            color="primary"
            class="full-width"
            @click="CrearUsuario()"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import axios from "axios";
import CrearUsuario from "./CrearUsuario.vue";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    iniciarSesion() {
      const data = {
        Email: this.email,
        Password: this.password,
      };

      axios
        .post("https://localhost:44384/api/Auth/login", data)
        .then((response) => {
          debugger;
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("Usuario", JSON.stringify(response.data));
          debugger;
          this.$router.push(
            response.data.tipo === "usuario"
              ? "/Usuario/Inicio"
              : "/Empresa/Actividad"
          );
          this.$q.notify({
            type: "positive",
            message: "Inicio de sesión exitoso",
          });
        })
        .catch((error) => {
          debugger;
          this.$q.notify({
            type: "negative",
            message: error.response
              ? error.response.data.message
              : "Error de red",
          });
        });
    },
    CrearUsuario() {
      location.href = "/CrearUsuario";
    },
  },
};
</script>

<style>
body {
  background-color: #eee;
}

.container {
  height: 100vh; /* Hace que el contenedor ocupe todo el alto de la ventana */
}

.my-card {
  width: 300px; /* O el ancho que prefieras */
  max-width: 90%; /* Para asegurar que se vea bien en pantallas pequeñas */
}
</style>
