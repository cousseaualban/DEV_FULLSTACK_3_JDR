import CampagneDetail from "@/components/campagne/CampagneDetail.vue";
import CampagneListe from "@/components/campagne/CampagneListe.vue";
import ChapitreDetail from "@/components/chapitre/ChapitreDetail.vue";
import ChapitreListe from "@/components/chapitre/ChapitreListe.vue";
import CampagneView from "@/views/CampagneView.vue";
import ChapitreView from "@/views/ChapitreView.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: '/', component: CampagneView, children: [
    { path: '', name: 'liste-campagne', component: CampagneListe },
    { path: 'detail/:idCampagne', name: 'detail-campagne', component: CampagneDetail, children: [
      { path: 'chapitre', component: ChapitreView, children: [
        { path: '', name: 'liste-chapitre', component: ChapitreListe },
        { path: 'detail/:idChapitre', name: 'detail-chapitre', component: ChapitreDetail }
      ]}
      
    ]}
  ] },
];

const router = createRouter({
  // Le mode de navigation - createWebHistory pour une navigation type html5
  history: createWebHistory(),
  // La liste des routes
  routes,
});

export default router;