<script setup>
import useCampagneStore from '@/stores/campagne.js';;
import CampagneModalAjout from './CampagneModalAjout.vue';
import { useRouter } from 'vue-router';
import AppButton from '../AppButton.vue';

const router = useRouter()

const store = useCampagneStore()

function navigation(id) {
  router.push({ name: 'liste-chapitre', params: {idCampagne: id} });
}

</script>

<template>
    <CampagneModalAjout @sauvegarde="store.ajouterCampagne"/>

    <table border="1">
        <thead>
            <tr>
                <th>id</th>
                <th>Nom</th>
                <th>Etat</th>
                <th>Description</th>
                <th>Commentaire</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="campagne in store.liste">
                <td>{{ campagne.id }}</td>
                <td>{{ campagne.nom }}</td>
                <td>{{ campagne.statut }}</td>
                <td>{{ campagne.description }}</td>
                <td>{{ campagne.commentaire_MJ }}</td>
                <td>
                    <AppButton @click="store.supprimerCampagne(campagne.id)">Supprimer</AppButton>
                    <AppButton @click="store.dupliquerCampagne(campagne.id)">Dupliquer</AppButton>
                    <AppButton @click="navigation(campagne.id)">Detail</AppButton>
                </td>
            </tr>
        </tbody>
    </table>
</template>