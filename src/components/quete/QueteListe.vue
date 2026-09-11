<script setup>
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import useQueteStore from '@/stores/quete';
import QueteModalAjout from './QueteModalAjout.vue';

const router = useRouter()
const route = useRoute()

const store = useQueteStore()

const quetes = computed(() => (store.quetesChapitre(route.params.idChapitre)))

function navigation(id) {
  router.push({ name: 'detail-quete', params: { idQuete: id, idChapitre: route.params.idChapitre, idCampagne: route.params.idCampagne } });
}
</script>

<template>
    <QueteModalAjout @sauvegarde="store.ajouterQuete" :id-campagne="route.params.idCampagne" :id-chapitre="route.params.idChapitre"/>

    <table border="1">
        <thead>
            <tr>
                <th>id</th>
                <th>Nom</th>
                <th>Statut</th>
                <th>Description</th>
                <th>Commentaire</th>
                <th>MDP Activation</th>
                <th>MDP Résolution</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="quete in quetes">
                <td>{{ quete.id }}</td>
                <td>{{ quete.nom }}</td>
                <td>{{ quete.statut }}</td>
                <td>{{ quete.description }}</td>
                <td>{{ quete.commentaire_MJ }}</td>
                <td>{{ quete.mdp_activation }}</td>
                <td>{{ quete.mdp_resolution }}</td>
                <td>
                    <button type="button" @click="store.supprimerQuete(quete.id)">Supprimer</button>
                    <button type="button" @click="store.dupliquerQuete(quete.id)">Dupliquer</button>
                    <button type="button" @click="navigation(quete.id)">Detail</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>