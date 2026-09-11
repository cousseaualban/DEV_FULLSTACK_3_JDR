import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import MjHomeView from '../views/mj/MjHomeView.vue'
import PlayerHomeView from '../views/player/PlayerHomeView.vue'
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
import QueteDetail from "@/components/quete/QueteDetail.vue";
import QueteListe from "@/components/quete/QueteListe.vue";
import CampagneView from "@/views/CampagneView.vue";
import ChapitreView from "@/views/ChapitreView.vue";
import ContenuView from "@/views/ContenuView.vue";
import JoueurView from "@/views/JoueurView.vue";
import QueteView from "@/views/QueteView.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/mj',
      name: 'mj',
      component: MjHomeView
    },
    {
      path: '/player',
      name: 'player',
      component: PlayerHomeView
    },
    { path: '/campagne', component: CampagneView, children: [
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
          { path: 'detail/:idChapitre', name: 'detail-chapitre', component: ChapitreDetail, children: [
            { path: 'quete', component: QueteView, children: [
              { path: '', name: 'liste-quete', component: QueteListe },
              { path: 'detail/:idQuete', name: 'detail-quete', component: QueteDetail}
            ] }
          ] }
        ]},
        { path: 'joueur', component: JoueurView, children: [
          { path: '', name: 'liste-joueur', component: JoueurListe },
          { path: 'detail/:idJoueur', name: 'detail-joueur', component: JoueurDetail }
        ]}
      ]}
    ] },
  ]
})

export default router
