<template>
  <q-card class="my-card">
    <q-card-section>
      <div class="text-h6">{{ actividad.titulo }}</div>
      <div class="text-subtitle2">{{ actividad.destino }}</div>
    </q-card-section>

    <q-card-section>
      <div>{{ actividad.descripcion }}</div>
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="Ver Detalles" @click="verDetalles" />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: "ActividadCard",
  props: {
    actividad: {
      type: Object,
      required: true,
    },
  },
  methods: {
    verDetalles() {
      this.$router.push({
        name: "actividad-detalles",
        params: { id: this.actividad.id },
      });
    },
  },
};
</script>

<style scoped>
.my-card {
  margin: 16px;
}
</style>
