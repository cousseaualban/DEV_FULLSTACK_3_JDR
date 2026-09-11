<script setup>
import CampagneListe from '@/components/campagne/CampagneListe.vue';
import CampagneModalAjout from '@/components/campagne/CampagneModalAjout.vue';
import { ref } from 'vue';

const campagnes = ref([{ id: 'fzefz', nom: 'test', etat: 'active', description: 'lorenispi', commentaire: 'lorens', chapitres: [
        { id: 'fzefz', nom: 'test', etat: 'inactif', description: 'lorenispi', commentaire: 'lorens', mdpAct: 'tezrd', mdpRes: 'adazd' }
    
] }])

function ajouter(campagne) {
    campagnes.value.push({
        ...campagne,
        id: crypto.randomUUID()
    })
}

</script>

<template>
    <h1>Campagnes</h1>
    <CampagneModalAjout @sauvegarde="ajouter"/>

    <CampagneListe :campagnes/>
    
</template>