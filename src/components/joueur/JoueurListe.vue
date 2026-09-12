<script setup>
import { useRoute, useRouter } from 'vue-router';
import useJoueurStore from '@/stores/joueur.js';
import { computed } from 'vue';
import JoueurModalAjout from './JoueurModalAjout.vue';
import AppButton from '../AppButton.vue';
import AppTable from '../AppTable.vue';

const router = useRouter()
const route = useRoute()

const store = useJoueurStore()

const joueurs = computed(() => (store.joueursCampagne(route.params.idCampagne)))

function navigation(id) {
  router.push({ name: 'detail-joueur', params: { idJoueur: id, idCampagne: route.params.idCampagne } });
}

const columns = [
    { key: 'id', label: 'ID' },
    { key: 'nom', label: 'Nom' },
    { key: 'description', label: 'Description' },
    { key: 'commentaire_MJ', label: 'Commentaire' },
    { key: 'actions', label: 'Actions' }
]
</script>

<template>
    <JoueurModalAjout @sauvegarde="store.ajouterJoueur" :id-campagne="route.params.idCampagne"/>
    <AppTable :columns :rows="joueurs">
        <template #cell-actions="{ row }">
            <AppButton @click="store.supprimerJoueur(row.id)">Supprimer</AppButton>
            <AppButton @click="store.dupliquerJoueur(row.id)">Dupliquer</AppButton>
            <AppButton @click="navigation(row.id)">Detail</AppButton>
        </template>
    </AppTable>
</template>