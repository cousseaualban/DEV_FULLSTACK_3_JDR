import CampagneView from "@/views/CampagneView.vue";
import ChapitreView from "@/views/ChapitreView.vue";
import JoueurAccueilView from "@/views/joueur/JoueurAccueilView.vue";
import ProgressionView from "@/views/joueur/ProgressionView.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", name: "campagne", component: CampagneView },
  { path: "/chapitres", name: "chapitre", component: ChapitreView },
  {
    path: "/joueur",
    name: "joueur-accueil",
    component: JoueurAccueilView,
  },
  {
    path: "/joueur/progression",
    name: "joueur-progression",
    component: ProgressionView,
  },
];

const router = createRouter({
  // Le mode de navigation - createWebHistory pour une navigation type html5
  history: createWebHistory(),
  // La liste des routes
  routes,
});

export default router;
