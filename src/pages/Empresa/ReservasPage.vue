<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">Listado de Reservas</div>
      </q-card-section>
      <q-card-section>
        <q-table :rows="reservas" :columns="columns" row-key="id" />
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      reservas: [],
      columns: [
        { name: "id", label: "ID Reserva", field: "id", align: "left" },
        {
          name: "usuarioNombre", // Cambiado de usuarioId a usuarioNombre
          label: "Nombre del Usuario",
          field: "usuarioNombre", // Asegúrate de que el campo se llama usuarioNombre
          align: "left",
        },
        {
          name: "actividadTitulo", // Cambiado de actividadId a actividadTitulo
          label: "Título de la Actividad",
          field: "actividadTitulo", // Asegúrate de que el campo se llama actividadTitulo
          align: "left",
        },
        {
          name: "fechaReserva",
          label: "Fecha de Reserva",
          field: "fechaReserva",
          align: "left",
        },
      ],
    };
  },
  mounted() {
    this.fetchReservas();
  },
  methods: {
    fetchReservas() {
      axios
        .get("https://localhost:44384/api/reservas")
        .then((response) => {
          debugger;
          console.log("Reservas recibidas:", response.data);
          this.reservas = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener reservas:", error);
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
