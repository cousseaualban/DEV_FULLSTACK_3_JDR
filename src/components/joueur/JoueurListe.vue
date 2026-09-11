<script setup>
import { useRoute, useRouter } from 'vue-router';
import useJoueurStore from '@/stores/joueur.js';
import { computed } from 'vue';
import JoueurModalAjout from './JoueurModalAjout.vue';

const router = useRouter()
const route = useRoute()

const store = useJoueurStore()

const joueurs = computed(() => (store.joueursCampagne(route.params.idCampagne)))

function navigation(id) {
  router.push({ name: 'detail-joueur', params: { idJoueur: id, idCampagne: route.params.idCampagne } });
}
</script>

<template>
    <JoueurModalAjout @sauvegarde="store.ajouterJoueur" :id-campagne="route.params.idCampagne"/>
    <table border="1">
        <thead>
            <tr>
                <th>id</th>
                <th>Nom</th>
                <th>Description</th>
                <th>Commentaire</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="joueur in joueurs">
                <td>{{ joueur.id }}</td>
                <td>{{ joueur.nom }}</td>
                <td>{{ joueur.description }}</td>
                <td>{{ joueur.commentaire_MJ }}</td>
                <td>
                    <button type="button" @click="store.supprimerJoueur(joueur.id)">Supprimer</button>
                    <button type="button" @click="store.dupliquerJoueur(joueur.id)">Dupliquer</button>
                    <button type="button" @click="navigation(joueur.id)">Detail</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>