<template>
  <q-page>
    <q-card>
      <q-card-section>
        <div class="text-h6">Dashboard de Empresa</div>
      </q-card-section>

      <!-- Carousel de Actividades Recientes -->
      <q-card-section>
        <div class="text-subtitle1">Actividades Recientes</div>
        <q-carousel
          v-if="activities.length > 0"
          v-model="activityIndex"
          animated
          swipeable
          arrows
          navigation
        >
          <q-carousel-slide v-for="activity in activities" :key="activity.id">
            <q-card>
              <q-card-section>
                <!-- <q-img :src="activity.image" /> -->
                <div class="text-h6">{{ activity.titulo }}</div>
                <div>{{ activity.descripcion }}</div>
                <div>Fecha: {{ activity.fechaInicio }}</div>
              </q-card-section>
            </q-card>
          </q-carousel-slide>
        </q-carousel>
        <div v-else>No hay actividades recientes.</div>
      </q-card-section>

      <!-- Carousel de Solicitudes Recientes -->
      <q-card-section>
        <div class="text-subtitle1">Solicitudes Recientes</div>
        <q-carousel
          v-if="requests.length > 0"
          v-model="requestIndex"
          animated
          swipeable
          arrows
          navigation
        >
          <q-carousel-slide v-for="request in requests" :key="request.id">
            <q-card>
              <q-card-section>
                <div class="text-h6">{{ request.user.name }}</div>
                <div>Actividad: {{ request.activity.title }}</div>
                <div>Fecha de Solicitud: {{ request.date }}</div>
              </q-card-section>
            </q-card>
          </q-carousel-slide>
        </q-carousel>
        <div v-else>No hay solicitudes recientes.</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      activities: [], // Esta será llenada con los datos de la API
      requests: [], // Esta será llenada con los datos de la API
      activityIndex: 0, // Controla el índice actual del carrusel de actividades
      requestIndex: 0, // Controla el índice actual del carrusel de solicitudes
    };
  },
  mounted() {
    // Llamadas a la API para obtener las actividades y solicitudes recientes
    this.getRecentActivities();
    this.getRecentRequests();
  },
  methods: {
    getRecentActivities() {
      axios
        .get("https://localhost:44384/api/Actividades")
        .then((response) => {
          console.log("Actividades recibidas:", response.data); // Agrega un log para verificar los datos recibidos
          if (Array.isArray(response.data)) {
            this.activities = response.data;
          } else {
            console.error("Error: La respuesta de actividades no es un array.");
          }
          console.log("this.activities:", this.activities); // Verificar el estado de activities
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
    getRecentRequests() {
      axios
        .get("/api/company/requests/recent")
        .then((response) => {
          console.log("Solicitudes recibidas:", response.data); // Agrega un log para verificar los datos recibidos
          if (Array.isArray(response.data)) {
            this.requests = response.data;
          } else {
            console.error("Error: La respuesta de solicitudes no es un array.");
          }
          console.log("this.requests:", this.requests); // Verificar el estado de requests
        })
        .catch((error) => {
          console.error("Error al obtener solicitudes:", error);
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

<style>
.my-card {
  margin-bottom: 20px;
}
</style>
