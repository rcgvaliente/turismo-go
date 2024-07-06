<template>
  <q-page padding>
    <q-card class="q-ma-md">
      <q-card-section>
        <div class="text-h6">Bienvenido, {{ usuario.nombre }}</div>
        <div class="text-subtitle1">Email: {{ usuario.email }}</div>
      </q-card-section>
      <q-card-section>
        <q-carousel
          v-model="slide"
          animated
          infinite
          swipeable
          arrows
          navigation
          autoplay
          :autoplay-interval="2000"
        >
          <q-carousel-slide
            v-for="(img, index) in imagenes"
            :key="index"
            :name="index"
            :img-src="img.src"
          />
        </q-carousel>
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
      },
      slide: 0,
      imagenes: [
        {
          src: "https://www.bbva.com/wp-content/uploads/2020/12/turismo_sostenible-1024x629.jpg",
        },
        {
          src: "https://www.comexperu.org.pe/upload/images/hechos_turismo-receptivo-140723-020639.jpg",
        },
        {
          src: "https://www.caf.com/media/3337680/pixabay-rio-de-janeiro-1024x682.jpeg",
        },
      ],
    };
  },
  mounted() {
    this.fetchUsuario();
  },
  methods: {
    fetchUsuario() {
      var usuario = JSON.parse(localStorage.getItem("Usuario"));
      const usuarioId = usuario.id; // Cambia esto por el ID del usuario autenticado o pasado por props
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
  },
};
</script>

<style scoped>
.q-card-section {
  display: flex;
  flex-direction: column;
}
</style>
