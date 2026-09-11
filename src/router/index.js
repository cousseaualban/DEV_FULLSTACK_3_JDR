import CampagneDetail from "@/components/campagne/CampagneDetail.vue";
import CampagneListe from "@/components/campagne/CampagneListe.vue";
import ChapitreDetail from "@/components/chapitre/ChapitreDetail.vue";
import ChapitreListe from "@/components/chapitre/ChapitreListe.vue";
import ContenuListe from "@/components/contenu/ContenuListe.vue";
import IndiceDetail from "@/components/contenu/IndiceDetail.vue";
import LieuDetail from "@/components/contenu/LieuDetail.vue";
import ObjetDetail from "@/components/contenu/ObjetDetail.vue";
import JoueurDetail from "@/components/joueur/JoueurDetail.vue";
import JoueurListe from "@/components/joueur/JoueurListe.vue";
import CampagneView from "@/views/CampagneView.vue";
import ChapitreView from "@/views/ChapitreView.vue";
import ContenuView from "@/views/ContenuView.vue";
import JoueurView from "@/views/JoueurView.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: '/', component: CampagneView, children: [
    { path: '', name: 'liste-campagne', component: CampagneListe },
    { path: 'detail/:idCampagne', name: 'detail-campagne', component: CampagneDetail, children: [
      { path: 'contenu', component: ContenuView, children: [
        { path: '', name: 'liste-contenu', component: ContenuListe },
        { path: 'detail-objet/:idObjet', name: 'detail-objet', component: ObjetDetail },
        { path: 'detail-lieu/:idLieu', name: 'detail-lieu', component: LieuDetail },
        { path: 'detail-indice/:idIndice', name: 'detail-indice', component: IndiceDetail }
      ] },
      { path: 'chapitre', component: ChapitreView, children: [
        { path: '', name: 'liste-chapitre', component: ChapitreListe },
        { path: 'detail/:idChapitre', name: 'detail-chapitre', component: ChapitreDetail }
      ]},
      { path: 'joueur', component: JoueurView, children: [
        { path: '', name: 'liste-joueur', component: JoueurListe },
        { path: 'detail/:idJoueur', name: 'detail-joueur', component: JoueurDetail }
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