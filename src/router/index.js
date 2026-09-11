import CampagneView from "@/views/CampagneView.vue";
import ChapitreView from "@/views/ChapitreView.vue";
import JoueurAccueilView from "@/views/Joueur/JoueurAccueilView.vue";
import ProgressionView from "@/views/Joueur/ProgressionView.vue";
import ChapitreDetailView from "@/views/Joueur/ChapitreDetailView.vue";
import { createRouter, createWebHistory } from "vue-router";
import QueteDetailView from "@/views/Joueur/QueteDetailView.vue";
import InventaireView from "@/views/Joueur/InventaireView.vue";
import ActionsJoueurView from "@/views/Joueur/ActionsJoueurView.vue";

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
  {
    path: "/joueur/chapitres/:id",
    name: "joueur-chapitre-detail",
    component: ChapitreDetailView,
  },
  {
    path: "/joueur/quetes/:id",
    name: "joueur-quete-detail",
    component: QueteDetailView,
  },
  {
    path: "/joueur/inventaire",
    name: "joueur-inventaire",
    component: InventaireView,
  },
  {
    path: "/joueur/actions",
    name: "joueur-actions",
    component: ActionsJoueurView,
  },
  {
    path: "/joueur/inventaire",
    name: "joueur-inventaire",
    component: InventaireView,
  },
  {
    path: "/joueur/actions",
    name: "joueur-actions",
    component: ActionsJoueurView,
  },
];

const router = createRouter({
  // Le mode de navigation - createWebHistory pour une navigation type html5
  history: createWebHistory(),
  // La liste des routes

  routes,
});

export default router;
