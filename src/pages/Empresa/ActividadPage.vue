<template>
  <q-page class="q-pa-md">
    <!-- Botón para abrir el diálogo de Publicar Actividad -->
    <q-btn
      @click="showDialog = true"
      label="Publicar Nueva Actividad"
      color="primary"
      class="q-mb-md"
    />

    <!-- Diálogo para Publicar Actividad -->
    <q-dialog v-model="showDialog">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Publicar Nueva Actividad</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit="submitForm">
            <q-input
              filled
              v-model="newActivity.titulo"
              label="Título de la Actividad"
              required
            />
            <q-input
              filled
              v-model="newActivity.descripcion"
              label="Descripción"
              type="textarea"
              required
            />
            <q-input
              filled
              v-model="newActivity.fechaInicio"
              label="Fecha Inicio"
              type="date"
              required
            />
            <q-input
              filled
              v-model="newActivity.fechaFin"
              label="Fecha Fin"
              type="date"
              required
            />
            <q-input
              filled
              v-model="newActivity.precio"
              label="Precio"
              type="input"
              required
            />
            <q-input
              filled
              v-model="newActivity.capacidad"
              label="Capacidad"
              type="input"
              required
            />
            <q-input
              filled
              v-model="newActivity.itinerario"
              label="Itinerario"
              type="textarea"
              required
            />
            <q-btn
              type="button"
              label="Publicar"
              color="primary"
              @click="submitForm"
            />
            <q-btn
              flat
              label="Cancelar"
              color="primary"
              @click="showDialog = false"
              class="q-ml-sm"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Diálogo para Editar Actividad -->
    <q-dialog v-model="editDialog">
      <q-card style="width: 700px; max-width: 80vw">
        <q-card-section>
          <div class="text-h6">Editar Actividad</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit="updateActivity">
            <q-input
              filled
              v-model="editActivityData.titulo"
              label="Título de la Actividad"
              required
            />
            <q-input
              filled
              v-model="editActivityData.descripcion"
              label="Descripción"
              type="textarea"
              required
            />
            <q-input
              filled
              v-model="editActivityData.fechaInicio"
              label="Fecha"
              type="date"
              required
            />
            <q-input
              filled
              v-model="editActivityData.fechaFin"
              label="Fecha"
              type="date"
              required
            />
            <q-input
              filled
              v-model="editActivityData.precio"
              label="Precio"
              type="input"
              required
            />
            <q-input
              filled
              v-model="editActivityData.capacidad"
              label="Capacidad"
              type="input"
              required
            />
            <q-input
              filled
              v-model="editActivityData.itinerario"
              label="Itinerario"
              type="textarea"
              required
            />
            <q-btn type="submit" label="Guardar" color="primary" />
            <q-btn
              flat
              label="Cancelar"
              color="primary"
              @click="editDialog = false"
              class="q-ml-sm"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Gestión de Actividades y Historial de Actividades Publicadas -->
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Gestión de Actividades e Historial de Actividades Publicadas
        </div>
      </q-card-section>

      <q-card-section>
        <q-table
          :rows="activities"
          :columns="columns"
          row-key="id"
          title="Actividades"
          :no-data-label="'No hay actividades disponibles'"
        >
          <template v-slot:body-cell-actions="props">
            <q-btn
              icon="edit"
              color="primary"
              @click="editActivity(props.row)"
            />
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      showDialog: false, // Controla la visibilidad del diálogo de publicar
      editDialog: false, // Controla la visibilidad del diálogo de editar
      newActivity: {
        EmpresaId: "",
        titulo: "",
        descripcion: "",
        fechaInicio: "",
        fechaFin: "",
        itinerario: "",
        precio: "",
        capacidad: "",
      },
      editActivityData: {}, // Datos de la actividad a editar
      activities: [],
      columns: [
        { name: "titulo", label: "Título", field: "titulo", align: "left" },
        {
          name: "descripcion",
          label: "Descripción",
          field: "descripcion",
          align: "left",
        },
        {
          name: "fechaInicio",
          label: "Fecha",
          field: "fechaInicio",
          align: "left",
        },
        {
          name: "actions",
          label: "Acciones",
          field: "actions",
          align: "center",
        },
      ],
    };
  },
  mounted() {
    this.fetchActivities();
  },
  methods: {
    fetchActivities() {
      axios
        .get("https://localhost:44384/api/Actividades")
        .then((response) => {
          this.activities = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener las actividades:", error);
        });
    },
    submitForm() {
      var empresa = JSON.parse(localStorage.getItem("Usuario"));
      this.newActivity.EmpresaId = empresa.id;
      debugger;
      axios
        .post("https://localhost:44384/api/Actividades", this.newActivity)
        .then((response) => {
          // Agregar la nueva actividad a la lista de actividades

          this.fetchActivities();
          // Limpiar el formulario
          this.newActivity = {
            titulo: "",
            descripcion: "",
            fecha: "",
            itinerario: "",
            precio: "",
            capacidad: "",
          };
          // Cerrar el diálogo
          this.showDialog = false;
          this.$q.notify({
            type: "positive",
            message: "Actividad Creada",
          });
        })
        .catch((error) => {
          console.error("Error al publicar la actividad:", error);
        });
    },
    editActivity(activity) {
      // Abrir el diálogo de editar con los datos de la actividad
      this.editActivityData = { ...activity };
      this.editDialog = true;
    },
    updateActivity() {
      axios
        .put(
          `https://localhost:44384/api/Actividades/${this.editActivityData.id}`,
          this.editActivityData
        )
        .then((response) => {
          this.fetchActivities();
          // Cerrar el diálogo de editar
          this.editDialog = false;
        })
        .catch((error) => {
          console.error("Error al actualizar la actividad:", error);
        });
    },
    deleteActivity(id) {
      axios
        .delete(`https://localhost:44384/api/Actividades/${id}`)
        .then(() => {
          // Eliminar la actividad de la lista de actividades
          this.activities = this.activities.filter(
            (activity) => activity.id !== id
          );
        })
        .catch((error) => {
          console.error("Error al eliminar la actividad:", error);
        });
    },
  },
};
</script>
