<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lff" class="shadow-2 rounded-borders">
      <q-header elevated style="background-color: #ed6217">
        <q-toolbar>
          <q-toolbar-title>TURISMO GO - APP</q-toolbar-title>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
        </q-toolbar>
      </q-header>

      <q-drawer v-model="drawer" show-if-above :width="250" :breakpoint="400">
        <q-scroll-area
          style="
            height: calc(100% - 250px);
            margin-top: 150px;
            border-right: 1px solid #ddd;
          "
        >
          <q-list padding>
            <q-item clickable v-ripple to="/Empresa/Actividad">
              <q-item-section avatar>
                <q-icon name="format_list_bulleted" />
              </q-item-section>

              <q-item-section> Actividades </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/Empresa/Reservas">
              <q-item-section avatar>
                <q-icon name="summarize" />
              </q-item-section>

              <q-item-section> Reservas </q-item-section>
            </q-item>

            <q-item clickable v-ripple to="/Empresa/Informes">
              <q-item-section avatar>
                <q-icon name="legend_toggle" />
              </q-item-section>

              <q-item-section> Informes </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <q-list>
          <q-separator inset />
          <q-item clickable v-ripple to="/Empresa/configuracion">
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>
            <q-item-section> Configuración </q-item-section>
          </q-item>
          <q-item clickable v-ripple @click="confCerrarSesion = true">
            <q-item-section avatar>
              <q-icon name="power_settings_new" />
            </q-item-section>

            <q-item-section> Cerrar sesión </q-item-section>
          </q-item>
        </q-list>
        <q-img
          class="absolute-top"
          src="../img/TurismoGo_logo.png"
          style="height: 150px"
        >
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <!-- <img src="https://cdn.quasar.dev/img/boy-avatar.png" /> -->
            </q-avatar>
            <!-- <div>{{ correo }}</div> -->
          </div>
        </q-img>
      </q-drawer>

      <q-page-container style="background-color: #ddd">
        <q-page padding>
          <RouterView></RouterView>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
  <q-dialog v-model="confCerrarSesion" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="info" color="primary" text-color="white" />
        <span class="q-ml-sm">Esta seguro de cerrar sesión?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="primary" v-close-popup />
        <q-btn
          flat
          label="Confirmar"
          color="primary"
          v-close-popup
          @click="cerrarSesion"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref } from "vue";
// import { logout, keycloak } from "src/boot/keycloak.js";

export default {
  setup() {
    return {
      drawer: ref(false),
      usuario: localStorage.getItem("correo_usuario"),
      confCerrarSesion: ref(false),
    };
  },
  mounted() {},
  methods: {
    cerrarSesion() {
      localStorage.removeItem("token");
      localStorage.removeItem("Usuario");
      this.$router.push("/");
      this.$q.notify({
        type: "positive",
        message: "Sesión cerrada exitosamente",
      });
    },
  },
};
</script>
