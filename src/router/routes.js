const routes = [
  {
    path: "/Usuario",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "Inicio",
        component: () => import("pages/Usuario/InicioPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "Actividades",
        component: () => import("pages/Usuario/ActividadesPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "Resenias",
        component: () => import("pages/Usuario/ReseniasPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "Reservas",
        component: () => import("pages/Usuario/ReservasPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "Configuracion",
        component: () => import("pages/Usuario/ConfiguracionPage.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/Empresa",
    component: () => import("layouts/EmpresaLayout.vue"),
    children: [
      {
        path: "Inicio",
        component: () => import("pages/Empresa/PrincipalEmpresa.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "Actividad",
        component: () => import("pages/Empresa/ActividadPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "Informes",
        component: () => import("pages/Empresa/ReportePage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "Reservas",
        component: () => import("pages/Empresa/ReservasPage.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "Configuracion",
        component: () => import("pages/Empresa/ConfiguracionPage.vue"),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/CrearUsuario",
    component: () => import("pages/CrearUsuario.vue"),
  },
  {
    path: "/",
    component: () => import("pages/LoginPage.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
