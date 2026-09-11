<script setup>
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import useQueteStore from '@/stores/quete';
import QueteModalAjout from './QueteModalAjout.vue';
import AppButton from '../AppButton.vue';
import AppTable from '../AppTable.vue';

const router = useRouter()
const route = useRoute()

const store = useQueteStore()

const quetes = computed(() => (store.quetesChapitre(route.params.idChapitre)))

function navigation(id) {
  router.push({ name: 'detail-quete', params: { idQuete: id, idChapitre: route.params.idChapitre, idCampagne: route.params.idCampagne } });
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
    <QueteModalAjout @sauvegarde="store.ajouterQuete" :id-campagne="route.params.idCampagne" :id-chapitre="route.params.idChapitre"/>

    <AppTable :columns :rows="quetes">
        <template #cell-actions="{ row }">
            <AppButton @click="store.supprimerQuete(row.id)">Supprimer</AppButton>
            <AppButton @click="store.dupliquerQuete(row.id)">Dupliquer</AppButton>
            <AppButton @click="navigation(row.id)">Detail</AppButton>
        </template>
    </AppTable>
</template>