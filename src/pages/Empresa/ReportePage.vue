<template>
  <q-page padding>
    <q-card class="q-ma-md">
      <q-card-section>
        <div class="text-h6">Actividades Más Reservadas</div>
        <q-btn
          label="Exportar a Excel"
          @click="
            exportToExcel(
              actividadesMasReservadas,
              'Actividades_Mas_Reservadas'
            )
          "
        />
        <q-btn
          label="Exportar a PDF"
          @click="
            exportToPDF(
              actividadesMasReservadas,
              columnsReservas,
              'Actividades_Mas_Reservadas'
            )
          "
        />
      </q-card-section>
      <q-card-section>
        <div class="q-gutter-md row">
          <div class="col-12 col-md-5">
            <q-table
              :rows="actividadesMasReservadas"
              :columns="columnsReservas"
              row-key="actividadId"
            />
          </div>
          <div class="col-12 col-md-6">
            <Bar
              :data="chartDataReservadas"
              :options="chartOptions('Actividades Más Reservadas')"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="q-ma-md">
      <q-card-section>
        <div class="text-h6">Actividades Mejor Valoradas</div>
        <q-btn
          label="Exportar a Excel"
          @click="
            exportToExcel(
              actividadesMejorValoradas,
              'Actividades_Mejor_Valoradas'
            )
          "
        />
        <q-btn
          label="Exportar a PDF"
          @click="
            exportToPDF(
              actividadesMejorValoradas,
              columnsValoraciones,
              'Actividades_Mejor_Valoradas'
            )
          "
        />
      </q-card-section>
      <q-card-section>
        <div class="q-gutter-md row">
          <div class="col-12 col-md-5">
            <q-table
              :rows="actividadesMejorValoradas"
              :columns="columnsValoraciones"
              row-key="actividadId"
            />
          </div>
          <div class="col-12 col-md-6">
            <Bar
              :data="chartDataValoradas"
              :options="chartOptions('Actividades Mejor Valoradas')"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="q-ma-md">
      <q-card-section>
        <div class="text-h6">Empresas Más Activas</div>
        <q-btn
          label="Exportar a Excel"
          @click="exportToExcel(empresasMasActivas, 'Empresas_Mas_Activas')"
        />
        <q-btn
          label="Exportar a PDF"
          @click="
            exportToPDF(
              empresasMasActivas,
              columnsEmpresas,
              'Empresas_Mas_Activas'
            )
          "
        />
      </q-card-section>
      <q-card-section>
        <div class="q-gutter-md row">
          <div class="col-12 col-md-5">
            <q-table
              :rows="empresasMasActivas"
              :columns="columnsEmpresas"
              row-key="empresa"
            />
          </div>
          <div class="col-12 col-md-6">
            <Bar
              :data="chartDataEmpresas"
              :options="chartOptions('Empresas Más Activas')"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="q-ma-md">
      <q-card-section>
        <div class="text-h6">Usuarios por Actividad</div>
        <q-btn
          label="Exportar a Excel"
          @click="exportToExcel(usuariosPorActividad, 'Usuarios_Por_Actividad')"
        />
        <q-btn
          label="Exportar a PDF"
          @click="
            exportToPDF(
              usuariosPorActividad,
              columnsUsuarios,
              'Usuarios_Por_Actividad'
            )
          "
        />
      </q-card-section>
      <q-card-section>
        <div class="q-gutter-md row">
          <div class="col-12 col-md-5">
            <q-table
              :rows="usuariosPorActividad"
              :columns="columnsUsuarios"
              row-key="actividadId"
            />
          </div>
          <div class="col-12 col-md-6">
            <Bar
              :data="chartDataUsuarios"
              :options="chartOptions('Usuarios por Actividad')"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  components: {
    Bar,
  },
  data() {
    return {
      actividadesMasReservadas: [],
      actividadesMejorValoradas: [],
      empresasMasActivas: [],
      usuariosPorActividad: [],
      columnsReservas: [
        {
          name: "actividadId",
          required: true,
          label: "ID",
          align: "left",
          field: (row) => row.actividadId,
        },
        {
          name: "actividadNombre",
          label: "Nombre",
          align: "left",
          field: (row) => row.actividadNombre,
        },
        {
          name: "totalReservas",
          label: "Total Reservas",
          align: "right",
          field: (row) => row.totalReservas,
        },
      ],
      columnsValoraciones: [
        {
          name: "actividadId",
          required: true,
          label: "ID",
          align: "left",
          field: (row) => row.actividadId,
        },
        {
          name: "actividadNombre",
          label: "Nombre",
          align: "left",
          field: (row) => row.actividadNombre,
        },
        {
          name: "promedioValoracion",
          label: "Promedio Valoración",
          align: "right",
          field: (row) => row.promedioValoracion,
        },
      ],
      columnsEmpresas: [
        {
          name: "empresa",
          required: true,
          label: "Empresa",
          align: "left",
          field: (row) => row.empresa.nombre,
        },
        {
          name: "totalActividades",
          label: "Total Actividades",
          align: "right",
          field: (row) => row.totalActividades,
        },
      ],
      columnsUsuarios: [
        {
          name: "actividadId",
          required: true,
          label: "ID",
          align: "left",
          field: (row) => row.actividadId,
        },
        {
          name: "actividadNombre",
          label: "Nombre",
          align: "left",
          field: (row) => row.actividadNombre,
        },
        {
          name: "totalUsuarios",
          label: "Total Usuarios",
          align: "right",
          field: (row) => row.totalUsuarios,
        },
      ],
      chartDataReservadas: {
        labels: [],
        datasets: [],
      },
      chartDataValoradas: {
        labels: [],
        datasets: [],
      },
      chartDataEmpresas: {
        labels: [],
        datasets: [],
      },
      chartDataUsuarios: {
        labels: [],
        datasets: [],
      },
    };
  },
  created() {
    this.fetchInformes();
  },
  methods: {
    async fetchInformes() {
      try {
        const baseURL = "https://localhost:44384/api/Informes";
        const [reservadasRes, valoradasRes, empresasRes, usuariosRes] =
          await Promise.all([
            axios.get(`${baseURL}/actividades-mas-reservadas`),
            axios.get(`${baseURL}/actividades-mejor-valoradas`),
            axios.get(`${baseURL}/empresas-mas-activas`),
            axios.get(`${baseURL}/usuarios-por-actividad`),
          ]);
        this.actividadesMasReservadas = reservadasRes.data;
        this.actividadesMejorValoradas = valoradasRes.data;
        this.empresasMasActivas = empresasRes.data;
        this.usuariosPorActividad = usuariosRes.data;

        // Prepare chart data
        this.chartDataReservadas = {
          labels: this.actividadesMasReservadas.map(
            (item) => item.actividadNombre
          ),
          datasets: [
            {
              label: "Total Reservas",
              backgroundColor: "#42A5F5",
              data: this.actividadesMasReservadas.map(
                (item) => item.totalReservas
              ),
            },
          ],
        };

        this.chartDataValoradas = {
          labels: this.actividadesMejorValoradas.map(
            (item) => item.actividadNombre
          ),
          datasets: [
            {
              label: "Promedio Valoración",
              backgroundColor: "#66BB6A",
              data: this.actividadesMejorValoradas.map(
                (item) => item.promedioValoracion
              ),
            },
          ],
        };

        this.chartDataEmpresas = {
          labels: this.empresasMasActivas.map((item) => item.empresa.nombre),
          datasets: [
            {
              label: "Total Actividades",
              backgroundColor: "#FFA726",
              data: this.empresasMasActivas.map(
                (item) => item.totalActividades
              ),
            },
          ],
        };

        this.chartDataUsuarios = {
          labels: this.usuariosPorActividad.map((item) => item.actividadNombre),
          datasets: [
            {
              label: "Total Usuarios",
              backgroundColor: "#26C6DA",
              data: this.usuariosPorActividad.map((item) => item.totalUsuarios),
            },
          ],
        };
      } catch (error) {
        console.error("Error fetching informes:", error);
      }
    },
    exportToExcel(data, filename) {
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, `${filename}.xlsx`);
    },
    exportToPDF(data, columns, filename) {
      const doc = new jsPDF();
      const headers = columns.map((col) => col.label);
      const formattedData = data.map((row) =>
        columns.map((col) => {
          const field = col.field;
          return typeof field === "function" ? field(row) : row[field];
        })
      );
      doc.autoTable({
        head: [headers],
        body: formattedData,
      });
      doc.save(`${filename}.pdf`);
    },
    chartOptions(title) {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          title: {
            display: true,
            text: title,
          },
        },
      };
    },
  },
};
</script>

<style scoped>
.q-card-section {
  display: flex;
  flex-wrap: wrap;
}
.q-table {
  width: 100%;
}
</style>
