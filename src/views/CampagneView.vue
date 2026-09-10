<script setup>
import CampagneListe from '@/components/campagne/CampagneListe.vue';
import CampagneModalAjout from '@/components/campagne/CampagneModalAjout.vue';
import { ref } from 'vue';

const campagnes = ref([{ id: 'fzefz', nom: 'test', etat: 'active', description: 'lorenispi', commentaire: 'lorens' }])

function ajouter(campagne) {
    campagnes.value.push({
        ...campagne,
        id: crypto.randomUUID()
    })
}

</script>

<template>
    <h1>Campagne</h1>
    <CampagneModalAjout @sauvegarde="ajouter"/>

    <CampagneListe :campagnes/>
    
</template>