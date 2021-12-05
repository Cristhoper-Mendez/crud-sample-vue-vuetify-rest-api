import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/rol",
    name: "Rol",
    component: () => import("../views/Rol/Rol.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/rol/editar/:id",
    name: "EditarRol",
    component: () => import("../views/Rol/Editar.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/rol/eliminar/:id",
    name: "EliminarRol",
    component: () => import("../views/Rol/Eliminar.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/rol/ver/:id",
    name: "VerRol",
    component: () => import("../views/Rol/Ver.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/rol/agregar",
    name: "AgregarRol",
    component: () => import("../views/Rol/Agregar.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const routeProtected = to.matched.some((record) => record.meta.requiresAuth);

  if (routeProtected && store.state.token === "") {
    console.log(store.state.token);
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
