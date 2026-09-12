import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import MjHomeView from "@/views/mj/MjHomeView.vue";
import CampagneView from "@/views/mj/CampagneView.vue";
import ChapitreView from "@/views/mj/ChapitreView.vue";
import QueteView from "@/views/mj/QueteView.vue";
import ContenuView from "@/views/mj/ContenuView.vue";
import JoueurView from "@/views/mj/JoueurView.vue";
import CampagneEnCoursView from "@/views/mj/CampagneEnCoursView.vue";

import CampagneListe from "@/components/campagne/CampagneListe.vue";
import CampagneDetail from "@/components/campagne/CampagneDetail.vue";
import ChapitreListe from "@/components/chapitre/ChapitreListe.vue";
import ChapitreDetail from "@/components/chapitre/ChapitreDetail.vue";
import QueteListe from "@/components/quete/QueteListe.vue";
import QueteDetail from "@/components/quete/QueteDetail.vue";
import ContenuListe from "@/components/contenu/ContenuListe.vue";
import ObjetDetail from "@/components/contenu/ObjetDetail.vue";
import LieuDetail from "@/components/contenu/LieuDetail.vue";
import IndiceDetail from "@/components/contenu/IndiceDetail.vue";
import JoueurListe from "@/components/joueur/JoueurListe.vue";
import JoueurDetail from "@/components/joueur/JoueurDetail.vue";
import CampagneActiveChapitre from "@/components/campagne-active/CampagneActiveChapitre.vue";

import JoueurAccueilView from "@/views/Joueur/JoueurAccueilView.vue";
import ProgressionView from "@/views/Joueur/ProgressionView.vue";
import ChapitreDetailView from "@/views/Joueur/ChapitreDetailView.vue";
import QueteDetailView from "@/views/Joueur/QueteDetailView.vue";
import InventaireView from "@/views/Joueur/InventaireView.vue";
import ActionsJoueurView from "@/views/Joueur/ActionsJoueurView.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/mj", name: "mj", component: MjHomeView },
  { path: "/player", name: "player", redirect: "/joueur" },

  { path: "/joueur", name: "joueur-accueil", component: JoueurAccueilView },
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
    path: "/campagne",
    component: CampagneView,
    children: [
      { path: "", name: "liste-campagne", component: CampagneListe },
      {
        path: "detail/:idCampagne",
        name: "detail-campagne",
        component: CampagneDetail,
        children: [
          {
            path: "contenu",
            component: ContenuView,
            children: [
              { path: "", name: "liste-contenu", component: ContenuListe },
              {
                path: "detail-objet/:idObjet",
                name: "detail-objet",
                component: ObjetDetail,
              },
              {
                path: "detail-lieu/:idLieu",
                name: "detail-lieu",
                component: LieuDetail,
              },
              {
                path: "detail-indice/:idIndice",
                name: "detail-indice",
                component: IndiceDetail,
              },
            ],
          },
          {
            path: "chapitre",
            component: ChapitreView,
            children: [
              { path: "", name: "liste-chapitre", component: ChapitreListe },
              {
                path: "detail/:idChapitre",
                name: "detail-chapitre",
                component: ChapitreDetail,
                children: [
                  {
                    path: "quete",
                    component: QueteView,
                    children: [
                      { path: "", name: "liste-quete", component: QueteListe },
                      {
                        path: "detail/:idQuete",
                        name: "detail-quete",
                        component: QueteDetail,
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            path: "joueur",
            component: JoueurView,
            children: [
              { path: "", name: "liste-joueur", component: JoueurListe },
              {
                path: "detail/:idJoueur",
                name: "detail-joueur",
                component: JoueurDetail,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/campagne-en-cours",
    component: CampagneEnCoursView,
    children: [
      {
        path: "",
        name: "campagne-en-cours-chapitre",
        component: CampagneActiveChapitre,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
