<script setup>
import ChapitreListe from '@/components/chapitre/ChapitreListe.vue';
import ChapitreModalAjout from '@/components/chapitre/ChapitreModalAjout.vue';
import { ref } from 'vue';

const chapitres = ref([{ id: 'fzefz', nom: 'test', etat: 'inactif', description: 'lorenispi', commentaire: 'lorens', mdpAct: 'tezrd', mdpRes: 'adazd' }])

function ajouter(chapitre) {
    chapitres.value.push({
        ...chapitre,
        id: crypto.randomUUID()
    })
}

</script>

<template>
    <h1>Chapitres</h1>
    <ChapitreModalAjout @sauvegarde="ajouter"/>
    <ChapitreListe :chapitres />
</template>