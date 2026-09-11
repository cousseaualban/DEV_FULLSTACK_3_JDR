<script setup>
import useChapitreStore from '@/stores/chapitre.js';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ChapitreModalAjout from '../chapitre/ChapitreModalAjout.vue';
import App from '@/App.vue';
import AppTable from '../AppTable.vue';
import AppButton from '../AppButton.vue';

const router = useRouter()
const route = useRoute()
const store = useChapitreStore()

const chapitres = computed(() => (store.chapitresCampagne(route.params.idCampagne)))

function navigation(id) {
    router.push({ name: 'liste-quete', params: { idChapitre: id, idCampagne: route.params.idCampagne } })
}

const columns = [
    { key: 'id', label: 'ID' },
    { key: 'nom', label: 'Nom' },
    { key: 'statut', label: 'Etat' },
    { key: 'description', label: 'Description' },
    { key: 'commentaire_MJ', label: 'Commentaire' },
    { key: 'mdp_activation', label: 'MDP Activation' },
    { key: 'mdp_resolution', label: 'MDP Résolution' },
    { key: 'actions', label: 'Actions' }
]

</script>

<template>
    <ChapitreModalAjout @sauvegarde="store.ajouterChapitre" :id-campagne="route.params.idCampagne" />

    <AppTable :columns :rows="chapitres">
        
        <template #cell-actions="{ row }">
            <AppButton @click="store.supprimerChapitre(row.id)">Supprimer</AppButton>
            <AppButton @click="store.dupliquerChapitre(row.id)">Dupliquer</AppButton>
            <AppButton @click="navigation(row.id)">Detail</AppButton>
        </template>
    </AppTable>
</template>