<template>
  <div class="q-pa-md flex flex-center container">
    <q-card class="q-ma-md">
      <q-card-section>
        <div class="text-h6">Registro de Nuevo Usuario/Empresa</div>
      </q-card-section>
      <q-card-section>
        <q-form class="q-gutter-md">
          <q-input v-model="email" label="Email" type="email" required />
          <q-input
            v-model="password"
            label="Contraseña"
            type="password"
            required
          />
          <q-input v-model="nombre" label="Nombre" required />
          <q-select v-model="tipo" :options="tipos" label="Tipo" required />
          <q-btn
            type="button"
            label="Registrarse"
            color="primary"
            class="full-width"
            @click="register"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      nombre: "",
      tipo: "",
      tipos: [
        { label: "Usuario", value: "usuario" },
        { label: "Empresa", value: "empresa" },
      ],
    };
  },
  methods: {
    register() {
      const data = {
        Email: this.email,
        Password: this.password,
        Nombre: this.nombre,
        Tipo: this.tipo.value,
      };

      axios
        .post("https://localhost:44384/api/Auth/register", data)
        .then((response) => {
          this.$q.notify({
            type: "positive",
            message: "Registro exitoso",
          });
          this.$router.push("/");
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
  },
};
</script>

<style scoped>
.q-card-section {
  display: flex;
  flex-direction: column;
}
</style>
