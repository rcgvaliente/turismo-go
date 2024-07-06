<template>
  <q-page padding>
    <q-card
      v-for="actividad in actividades"
      :key="actividad.id"
      class="q-ma-md"
    >
      <q-card-section>
        <div class="text-h6">{{ actividad.titulo }}</div>
        <div>{{ actividad.descripcion }}</div>
        <q-btn flat label="Dejar Reseña" @click="dejarResena(actividad)" />
      </q-card-section>
    </q-card>

    <q-dialog v-model="dialogoResena">
      <q-card>
        <q-card-section>
          <div class="text-h6">
            Dejar Reseña para {{ actividadSeleccionada?.titulo }}
          </div>
          <q-input
            v-model="resena.comentario"
            label="Comentario"
            type="textarea"
          />
          <q-rating v-model="resena.calificacion" label="Valoración" />
        </q-card-section>
        <q-card-section>
          <q-btn label="Enviar Reseña" color="primary" @click="enviarResena" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      actividades: [],
      dialogoResena: false,
      actividadSeleccionada: null,
      resena: {
        comentario: "",
        calificacion: 0,
        actividadId: null,
        usuarioId: "", // Esto debería ser dinámico basado en el usuario autenticado
      },
    };
  },
  mounted() {
    this.fetchActividades();
  },
  methods: {
    fetchActividades() {
      axios
        .get("https://localhost:44384/api/Actividades") // Ajusta la URL según sea necesario
        .then((response) => {
          this.actividades = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener actividades:", error);
          this.$q.notify({
            type: "negative",
            message: error.response
              ? error.response.data.message
              : "Error de red",
          });
        });
    },
    dejarResena(actividad) {
      this.actividadSeleccionada = actividad;
      this.resena.actividadId = actividad.id;
      this.dialogoResena = true;
    },
    enviarResena() {
      var usuario = JSON.parse(localStorage.getItem("Usuario"));
      this.resena.id = usuario.id;

      const reseniaRequest = {
        UsuarioId: usuario.id,
        ActividadId: this.resena.actividadId,
        Calificacion: this.resena.calificacion,
        Comentario: this.resena.comentario,
      };

      axios
        .post("https://localhost:44384/api/resenias", reseniaRequest) // Ajusta la URL según sea necesario
        .then((response) => {
          this.$q.notify({
            type: "positive",
            message: "Reseña enviada correctamente",
          });
          this.dialogoResena = false;
          this.resena.comentario = "";
          this.resena.calificacion = 0;
        })
        .catch((error) => {
          console.error("Error al enviar la reseña:", error);
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
