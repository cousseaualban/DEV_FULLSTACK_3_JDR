import CampagneView from "@/views/CampagneView.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: '/', children: [
    { path: '', name: 'campagne', component: CampagneView }
  ]}
  
];

const router = createRouter({
  // Le mode de navigation - createWebHistory pour une navigation type html5
  history: createWebHistory(),
  // La liste des routes
  routes,
});

export default router;