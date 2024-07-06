<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">Historial de Actividades Reservadas</div>
      </q-card-section>
      <q-card-section>
        <q-table :rows="historial" :columns="columns" row-key="id">
          <template v-slot:body-cell-dejarResena="props">
            <q-td :props="props">
              <q-btn
                flat
                label="Dejar Reseña"
                @click="dejarResena(props.row)"
              />
            </q-td>
          </template>
        </q-table>
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
      historial: [],
      dialogoResena: false,
      actividadSeleccionada: null,
      resena: {
        comentario: "",
        calificacion: 0,
        actividadId: null,
        usuarioId: "", // Esto debería ser dinámico basado en el usuario autenticado
      },
      columns: [
        { name: "id", label: "ID Reserva", field: "id", align: "left" },
        {
          name: "actividadTitulo",
          label: "Actividad",
          field: "actividadTitulo",
          align: "left",
        },
        {
          name: "fechaReserva",
          label: "Fecha de Reserva",
          field: "fechaReserva",
          align: "left",
        },
        {
          name: "dejarResena",
          label: "Dejar Reseña",
          field: "dejarResena",
          align: "center",
        },
      ],
    };
  },
  mounted() {
    this.fetchHistorial();
  },
  methods: {
    fetchHistorial() {
      const usuario = JSON.parse(localStorage.getItem("Usuario"));
      axios
        .get(`https://localhost:44384/api/reservas/usuario/${usuario.id}`)
        .then((response) => {
          console.log("Historial recibido:", response.data);
          this.historial = response.data;
          debugger;
        })
        .catch((error) => {
          console.error("Error al obtener historial:", error);
          this.$q.notify({
            type: "negative",
            message: error.response
              ? error.response.data.message
              : "Error de red",
          });
        });
    },
    dejarResena(reserva) {
      debugger;
      // Aquí deberíamos buscar los detalles de la actividad correspondiente a la reserva.
      axios
        .get(`https://localhost:44384/api/actividades/${reserva.actividadId}`)
        .then((response) => {
          this.actividadSeleccionada = response.data;
          this.resena.actividadId = reserva.actividadId;
          this.dialogoResena = true;
        })
        .catch((error) => {
          console.error("Error al obtener detalles de la actividad:", error);
          this.$q.notify({
            type: "negative",
            message: error.response
              ? error.response.data.message
              : "Error de red",
          });
        });
    },
    enviarResena() {
      const usuario = JSON.parse(localStorage.getItem("Usuario"));
      this.resena.usuarioId = usuario.id;

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
