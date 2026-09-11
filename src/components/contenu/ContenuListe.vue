<script setup>

import { useRoute, useRouter } from 'vue-router';
import useObjetStore from '@/stores/objet.js';
import useLieuStore from '@/stores/lieu.js';
import useIndiceStore from '@/stores/indice.js';
import { computed } from 'vue';
import ObjetModalAjout from './ObjetModalAjout.vue';
import LieuModalAjout from './LieuModalAjout.vue';
import IndiceModalAjout from './IndiceModalAjout.vue';

const router = useRouter()
const route = useRoute()
const storeObjet = useObjetStore()
const storeLieu = useLieuStore()
const storeIndice = useIndiceStore()

const listeComplete = computed(() => [
    ...storeObjet.objetsCampagne(route.params.idCampagne).map(objet => ({
        ...objet,
        type: 'objet'
    })),

    ...storeLieu.lieuxCampagne(route.params.idCampagne).map(lieu => ({
        ...lieu,
        type: 'lieu'
    })),

    ...storeIndice.indicesCampagne(route.params.idCampagne).map(indice => ({
        ...indice,
        description: indice.texte,
        type: 'indice'
    }))
])

function supprimerContenu(id, type) {
    if (type === 'objet') {
        storeObjet.supprimerObjet(id)
    } else if (type === 'lieu') {
        storeLieu.supprimerLieu(id)
    } else if (type === 'indice') {
        storeIndice.supprimerIndice(id)
    }
}

function dupliquerContenu(id, type) {
    if (type === 'objet') {
        storeObjet.dupliquerObjet(id)
    } else if (type === 'lieu') {
        storeLieu.dupliquerLieu(id)
    } else if (type === 'indice') {
        storeIndice.dupliquerIndice(id)
    }
}

function navigation(id, type) {
    if (type === 'objet') {
        router.push({ name: 'detail-objet', params: { idObjet: id, idCampagne: route.params.idCampagne } })
    } else if (type === 'lieu') {
        router.push({ name: 'detail-lieu', params: { idLieu: id, idCampagne: route.params.idCampagne } })
    } else if (type === 'indice') {
        router.push({ name: 'detail-indice', params: { idIndice: id, idCampagne: route.params.idCampagne } })
    }
}

</script>

<template>
    <ObjetModalAjout @sauvegarde="storeObjet.ajouterObjet" :id-campagne="route.params.idCampagne" />
    <LieuModalAjout @sauvegarde="storeLieu.ajouterLieu" :id-campagne="route.params.idCampagne" />
    <IndiceModalAjout @sauvegarde="storeIndice.ajouterIndice" :id-campagne="route.params.idCampagne" />

    <table border="1">
        <thead>
            <tr>
                <th>id</th>
                <th>Nom</th>
                <th>Description</th>
                <th>Commentaire</th>
                <th>Type</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="contenu in listeComplete">
                <td>{{ contenu.id }}</td>
                <td>{{ contenu.nom }}</td>
                <td>{{ contenu.description }}</td>
                <td>{{ contenu.commentaire_MJ }}</td>
                <td>{{ contenu.type }}</td>
                <td>
                    <button type="button" @click="supprimerContenu(contenu.id, contenu.type)">Supprimer</button>
                    <button type="button" @click="dupliquerContenu(contenu.id, contenu.type)">Dupliquer</button>
                    <button type="button" @click="navigation(contenu.id, contenu.type)">Detail</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>