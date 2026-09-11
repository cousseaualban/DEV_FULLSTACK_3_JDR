<script setup>
import useChapitreStore from '@/stores/chapitre.js';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ChapitreModalAjout from '../chapitre/ChapitreModalAjout.vue';

const router = useRouter()
const route = useRoute()
const store = useChapitreStore()

const chapitres = computed(() => (store.chapitresCampagne(route.params.idCampagne)))

function dupliquer(chapitre) {
    const {
        campagne_id,
        nom,
        statut,
        description,
        commentaire_MJ,
        mdp_activation,
        objets_necessaires,
        mdp_resolution,
        recompenses_objets,
        recompenses_indices,
        ordre,
    } = chapitre
    store.ajouterChapitre(
        campagne_id,
        nom,
        statut,
        description,
        commentaire_MJ,
        mdp_activation,
        objets_necessaires,
        mdp_resolution,
        recompenses_objets,
        recompenses_indices,
        ordre,
    )
}

function navigation(id) {
    router.push({ name: 'detail-chapitre', params: { idChapitre: id, idCampagne: route.params.idCampagne } })
}

</script>

<template>
    <ChapitreModalAjout @sauvegarde="store.ajouterChapitre" :id-campagne="route.params.idCampagne" />

    <table border="1">
        <thead>
            <tr>
                <th>id</th>
                <th>Nom</th>
                <th>Etat</th>
                <th>Description</th>
                <th>Commentaire</th>
                <th>MDP Activation</th>
                <th>MDP Résolution</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="chapitre in chapitres">
                <td>{{ chapitre.id }}</td>
                <td>{{ chapitre.nom }}</td>
                <td>{{ chapitre.statut }}</td>
                <td>{{ chapitre.description }}</td>
                <td>{{ chapitre.commentaire_MJ }}</td>
                <td>{{ chapitre.mdp_activation }}</td>
                <td>{{ chapitre.mdp_resolution }}</td>
                <td>
                    <button type="button" @click="store.supprimerChapitre(chapitre.id)">Supprimer</button>
                    <button type="button" @click="dupliquer(chapitre)">Dupliquer</button>
                    <button type="button" @click="navigation(chapitre.id)">Detail</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>