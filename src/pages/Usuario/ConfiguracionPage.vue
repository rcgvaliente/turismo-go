<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">Perfil de Usuario</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="actualizarUsuario">
          <q-input v-model="usuario.nombre" label="Nombre" required />
          <q-input
            v-model="usuario.email"
            label="Email"
            type="email"
            required
          />
          <q-input
            v-model="usuario.password"
            label="Contraseña"
            type="password"
            required
          />
          <q-btn type="submit" label="Actualizar" color="primary" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      usuario: {
        id: null,
        nombre: "",
        email: "",
        password: "",
      },
    };
  },
  mounted() {
    this.fetchUsuario();
  },
  methods: {
    fetchUsuario() {
      var usuario = JSON.parse(localStorage.getItem("Usuario"));
      const usuarioId = usuario.id;

      axios
        .get(`https://localhost:44384/api/usuarios/${usuarioId}`)
        .then((response) => {
          this.usuario = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener los datos del usuario:", error);
          this.$q.notify({
            type: "negative",
            message: error.response
              ? error.response.data.message
              : "Error de red",
          });
        });
    },
    actualizarUsuario() {
      var usuario = JSON.parse(localStorage.getItem("Usuario"));
      const usuarioId = usuario.id;
      const usuarioRequest = {
        nombre: this.usuario.nombre,
        email: this.usuario.email,
        password: this.usuario.password,
      };

      axios
        .put(
          `https://localhost:44384/api/usuarios/${usuarioId}`,
          usuarioRequest
        )
        .then(() => {
          this.$q.notify({
            type: "positive",
            message: "Usuario actualizado correctamente",
          });
        })
        .catch((error) => {
          console.error("Error al actualizar el usuario:", error);
          this.$q.notify({
            type: "negative",
            message: error.response
              ? error.response.data.message
              : "Error de red",
          });
        });
    },
  },
};
</script>

<style scoped>
.q-card-section {
  display: flex;
  flex-direction: column;
}
</style>
