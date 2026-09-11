<script setup>
import useCampagneStore from '@/stores/campagne.js';;
import CampagneModalAjout from './CampagneModalAjout.vue';
import { useRouter } from 'vue-router';
import AppButton from '../AppButton.vue';
import AppTable from '../AppTable.vue';

const router = useRouter()

const store = useCampagneStore()

function navigation(id) {
  router.push({ name: 'liste-chapitre', params: {idCampagne: id} });
}

const columns = [
    { key: 'id', label: 'ID' },
    { key: 'nom', label: 'Nom' },
    { key: 'statut', label: 'Etat' },
    { key: 'description', label: 'Description' },
    { key: 'commentaire_MJ', label: 'Commentaire' },
    { key: 'actions', label: 'Actions' }
]

</script>

<template>
    <CampagneModalAjout @sauvegarde="store.ajouterCampagne"/>

    <AppTable :columns="columns" :rows="store.liste">
        <template #cell-actions="{ row }">

            <AppButton @click="store.supprimerCampagne(row.id)">
            Supprimer
            </AppButton>

            <AppButton @click="store.dupliquerCampagne(row.id)">
            Dupliquer
            </AppButton>

            <AppButton @click="navigation(row.id)">
            Detail
            </AppButton>

        </template>
    </AppTable>
</template>