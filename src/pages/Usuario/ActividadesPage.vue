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
        <q-btn flat label="Ver Detalles" @click="verDetalles(actividad)" />
      </q-card-section>
    </q-card>

    <q-dialog v-model="dialogoDetalles">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <q-input
            v-model="actividadSeleccionada.titulo"
            label="Título"
            disable
          />
          <q-input
            v-model="actividadSeleccionada.descripcion"
            label="Descripción"
            disable
          />
          <q-input
            v-model="actividadSeleccionada.itinerario"
            label="Itinerario"
            disable
          />
          <q-input
            v-model="actividadSeleccionada.fechaInicio"
            label="Fecha de Inicio"
            disable
          />
          <q-input
            v-model="actividadSeleccionada.fechaFin"
            label="Fecha de Fin"
            disable
          />
        </q-card-section>
        <q-card-section>
          <div class="text-h6">Reseñas</div>
          <q-list v-if="actividadSeleccionada.resenias.length > 0">
            <q-item
              v-for="resenia in actividadSeleccionada.resenias"
              :key="resenia.id"
            >
              <q-item-section>
                <div>
                  <q-rating v-model="resenia.calificacion" readonly />
                  <div>{{ resenia.comentario }}</div>
                  <div>{{ resenia.fechaPublicacion }}</div>
                </div>
              </q-item-section>
            </q-item>
          </q-list>
          <div v-else>No hay reseñas para esta actividad.</div>
        </q-card-section>
        <q-card-section>
          <q-btn
            label="Reservar Actividad"
            color="primary"
            @click="reservarActividad"
            :disable="actividadSeleccionada.reservadaPorUsuario"
          />
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
      dialogoDetalles: false,
      actividadSeleccionada: {
        id: "",
        titulo: "",
        descripcion: "",
        itinerario: "",
        fechaInicio: "",
        fechaFin: "",
        resenias: [],
        reservadaPorUsuario: false,
      },
    };
  },
  mounted() {
    this.fetchActividades();
  },
  methods: {
    fetchActividades() {
      var usuario = JSON.parse(localStorage.getItem("Usuario"));
      const usuarioId = usuario.id; // Cambia esto por el ID del usuario autenticado
      axios
        .get(`https://localhost:44384/api/Actividades?usuarioId=${usuarioId}`)
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
    verDetalles(actividad) {
      this.actividadSeleccionada = { ...actividad };
      this.dialogoDetalles = true;
    },
    reservarActividad() {
      var usuario = JSON.parse(localStorage.getItem("Usuario"));

      const reservaRequest = {
        UsuarioId: usuario.id,
        ActividadId: this.actividadSeleccionada.id,
      };
      debugger;
      axios
        .post("https://localhost:44384/api/reservas", reservaRequest)
        .then((response) => {
          this.$q.notify({
            type: "positive",
            message: "Actividad reservada correctamente",
          });
          this.dialogoDetalles = false;
          this.actividadSeleccionada.reservadaPorUsuario = true;
          this.fetchActividades();
        })
        .catch((error) => {
          console.error("Error al reservar la actividad:", error);
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
